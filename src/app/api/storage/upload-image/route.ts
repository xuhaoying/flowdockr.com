import { getUuid } from '@/shared/lib/hash';
import { respData, respErr } from '@/shared/lib/resp';
import { getUserInfo } from '@/shared/models/user';
import { getStorageService } from '@/shared/services/storage';

const MAX_FILES_PER_REQUEST = 5;
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;

const extFromMime = (mimeType: string) => {
  const map: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
    'image/gif': 'gif',
    'image/avif': 'avif',
    'image/heic': 'heic',
    'image/heif': 'heif',
  };
  return map[mimeType] || '';
};

export async function POST(req: Request) {
  try {
    const user = await getUserInfo();
    if (!user) {
      return Response.json(
        { code: -1, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const files = formData.getAll('files') as File[];

    if (!files || files.length === 0) {
      return respErr('No files provided');
    }

    if (files.length > MAX_FILES_PER_REQUEST) {
      return Response.json(
        { code: -1, message: 'Too many files provided' },
        { status: 413 }
      );
    }

    const storageService = await getStorageService();
    const uploadResults = [];

    for (const file of files) {
      // Validate file type
      const ext = extFromMime(file.type);
      if (!ext) {
        return respErr(`File ${file.name} is not an image`);
      }

      if (file.size <= 0 || file.size > MAX_FILE_SIZE_BYTES) {
        return Response.json(
          { code: -1, message: `File ${file.name} is too large` },
          { status: 413 }
        );
      }

      // Convert file to buffer
      const arrayBuffer = await file.arrayBuffer();
      const body = new Uint8Array(arrayBuffer);
      const key = `uploads/${user.id}/${getUuid()}.${ext}`;

      // Upload to storage
      const result = await storageService.uploadFile({
        body,
        key: key,
        contentType: file.type,
        disposition: 'inline',
      });

      if (!result.success) {
        console.error('[API] Upload failed:', result.error);
        return respErr(result.error || 'Upload failed');
      }

      uploadResults.push({
        url: result.url,
        key: result.key,
        filename: file.name,
        deduped: false,
      });
    }

    return respData({
      urls: uploadResults.map((r) => r.url),
      results: uploadResults,
    });
  } catch (e) {
    console.error('upload image failed:', e);
    return respErr('upload image failed');
  }
}
