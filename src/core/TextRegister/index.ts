export enum CharType {
  Mark = 'Mark',
  Hanzi = 'Hanzi',
}

export interface MarkCharConfig {
  type: CharType.Mark;
  char: string;
}

export interface HanziCharConfig {
  type: CharType.Hanzi;
  char: string;
  quanpin: string;
}

export interface TextConfig {
  key: string;
  title: string;
  text: (MarkCharConfig | HanziCharConfig)[];
}

export default class TextRegister {
  public texts: TextConfig[] = [];

  public register(text: TextConfig) {
    if (this.texts.some(({ key }) => key === text.key)) {
      return;
    }
    this.texts.push(text);
  }

  public getTextConfig(textKey: string) {
    return this.texts.find(({ key }) => key === textKey);
  }

  public getTextOptions() {
    return this.texts.map((item) => {
      return {
        key: item.key,
        title: item.title,
      };
    });
  }
}
