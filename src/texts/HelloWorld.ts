import { Registry, CharType } from '@/core';

Registry.text.register({
  key: 'HelloWorld',
  title: '你好，世界！',
  text: [
    {
      type: CharType.Hanzi,
      char: '你',
      quanpin: 'ni',
    },
    {
      type: CharType.Hanzi,
      char: '好',
      quanpin: 'hao',
    },
    {
      type: CharType.Mark,
      char: '，',
    },
    {
      type: CharType.Hanzi,
      char: '世',
      quanpin: 'shi',
    },
    {
      type: CharType.Hanzi,
      char: '界',
      quanpin: 'jie',
    },
    {
      type: CharType.Mark,
      char: '！',
    },
  ],
});
