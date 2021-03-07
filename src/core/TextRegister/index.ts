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
  description?: string;
  text: (MarkCharConfig | HanziCharConfig)[];
}

export interface LoadOptions extends Omit<TextConfig, 'text'> {
  content: string;
  pinyin: string;
}

export default class TextRegister {
  public texts: TextConfig[] = [];

  public register(text: TextConfig) {
    if (this.texts.some(({ key }) => key === text.key)) {
      return;
    }
    this.texts.push(text);
  }

  /**
   * 加载注音方案
   *
   * 适配工具站点：
   *
   * - https://zhongwenzhuanpinyin.bmcx.com/
   *   - 已知问题 “内”标记为“na”
   *   - 已知问题 “其”标记为“ji”
   */
  public load(options: LoadOptions) {
    const contentSegments = options.content.replace(/[ \n]/g, '').split('').filter(Boolean);
    const pinyinSegements = options.pinyin.replace(/[\n]/g, ' ').split(/ /g).filter(Boolean);
    const text: TextConfig['text'] = [];
    pinyinSegements.forEach((item, index) => {
      if (/^[a-z]+$/.test(item.toLowerCase())) {
        text.push({
          type: CharType.Hanzi,
          char: contentSegments[index],
          quanpin: item,
        });
      } else {
        text.push({
          type: CharType.Mark,
          char: contentSegments[index],
        });
      }
    });
    this.register({
      key: options.key,
      title: options.title,
      text,
    });
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
