import { observable } from 'mobx';

import { loginMessages } from '../messageConfig/loginMessages';
import { mapMessages } from '../messageConfig/mapMessages';
import { toolInfoContent} from '../messageConfig/toolInfoContent';

export default class Messages {
  @observable loginMessages = loginMessages;
  @observable mapMessages = mapMessages;
  @observable toolInfoContent = toolInfoContent;
}
