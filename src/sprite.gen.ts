export interface SpritesMap {
    'sprite': 'envelope' | 'password'
  }
export const SPRITES_META: {
           [Key in keyof SpritesMap]: {
             filePath: string;
             items: Record<SpritesMap[Key], {
                viewBox: string,
                width: number, height: number,
             }>
           }
         } = {
    'sprite': {
    filePath: 'sprite.742d15fb.svg',
    items: {
      'envelope': {
    viewBox: '0 0 15 16',
    width: 15, height: 16,
  },
'password': {
    viewBox: '0 0 15 16',
    width: 15, height: 16,
  }
    }
}
  };