import { AddTrack } from 'react-native-track-player';
import { fileType } from '../../../settings';
import type { Book, BookHasFile, Media } from '../../typings/types';

const INTRO_SKIP_SECONDS = 10;

export function getPrimaryCategoryId(book: Book | null | undefined): number | null {
  const rows = book?.bookHasCategories;
  if (!rows?.length) {
    return null;
  }
  const sorted = [...rows].sort((a, b) => a.category.id - b.category.id);
  return sorted[0]?.category?.id ?? null;
}

/** Default story audio (admin file), same rule as Story.tsx */
export function getDefaultAudioRow(book: Book): BookHasFile | undefined {
  const audios = book.bookHasFiles?.filter(f => f.type === fileType.AUDIO).sort((a, b) => b.id - a.id) ?? [];
  return audios.find(f => f.userId === null);
}

export function getDefaultImageFile(book: Book): Media | undefined {
  return book.bookHasFiles?.find(f => f.type === fileType.IMAGE)?.file;
}

export function bookToAddTrack(book: Book, preferredAudioRow?: BookHasFile | null): AddTrack | null {
  const row = preferredAudioRow ?? getDefaultAudioRow(book);
  const audioFile = row?.file;
  if (!audioFile?.path) {
    return null;
  }
  const imageFile = getDefaultImageFile(book);
  const storyIdForStats = row?.userId == null ? book.id : null;

  return {
    id: audioFile.id,
    url: audioFile.path,
    duration: audioFile.duration,
    title: book.name,
    artist: book.shortAuthorName ?? book.authorName,
    image: imageFile?.path,
    artwork: imageFile?.path,
    storyId: storyIdForStats,
  } as AddTrack;
}

export function buildTracksFromBooks(books: Book[], startBookId: number): { tracks: AddTrack[]; startIndex: number } {
  const tracks: AddTrack[] = [];
  let startIndex = 0;
  for (let i = 0; i < books.length; i++) {
    const b = books[i];
    const t = bookToAddTrack(b);
    if (t) {
      if (b.id === startBookId) {
        startIndex = tracks.length;
      }
      tracks.push(t);
    }
  }
  if (tracks.length === 0) {
    return { tracks: [], startIndex: 0 };
  }
  if (!books.some(b => b.id === startBookId)) {
    return { tracks, startIndex: 0 };
  }
  const validStart = Math.min(startIndex, tracks.length - 1);
  return { tracks, startIndex: validStart };
}

export function seekPastIntroClamp(durationSec: number | undefined): number {
  const d = durationSec ?? 0;
  if (d <= 0) {
    return 0;
  }
  const target = Math.min(INTRO_SKIP_SECONDS, Math.max(0, d - 0.5));
  return target;
}

/** Start position for a playlist story: resume past intro if user listened further, else skip intro. */
export function playlistStoryStartPosition(
  durationSec: number | undefined,
  savedProgressSec: number | null | undefined,
): number {
  const intro = seekPastIntroClamp(durationSec);
  if (savedProgressSec == null || savedProgressSec <= 0) {
    return intro;
  }
  const saved = Math.round(savedProgressSec);
  return saved > intro ? saved : intro;
}
