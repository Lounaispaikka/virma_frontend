import { observable } from 'mobx';

import { loginMessages } from '../../config/messageConfig/loginMessages';
import { mapMessages } from '../../config/messageConfig/mapMessages';
import { toolInfoContent} from '../../config/messageConfig/toolInfoContent';

export default class Messages {
  @observable loginMessages = loginMessages;
  @observable mapMessages = mapMessages;
  @observable toolInfoContent = toolInfoContent;
}
