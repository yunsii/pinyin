import SchemaRegister from './SchemaRegister';
import TextRegister from './TextRegister';

export default class Registry {
  public static schema: SchemaRegister = new SchemaRegister();

  public static text: TextRegister = new TextRegister();

  public static reinitialize = () => {
    Registry.schema = new SchemaRegister();
  };
}
