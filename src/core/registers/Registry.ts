import PinyinSchemaRegister from './PinyinSchemaRegister';
import TextRegister from './TextRegister';

export default class Registry {
  public static schema: PinyinSchemaRegister = new PinyinSchemaRegister();

  public static text: TextRegister = new TextRegister();

  public static reinitialize = () => {
    Registry.schema = new PinyinSchemaRegister();
    Registry.text = new TextRegister();
  };
}
