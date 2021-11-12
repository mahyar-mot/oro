import {message} from 'antd';
import {ERROR_MESSAGE, SUCCESS_MESSAGE, CONFLICT_MESSAGE} from './constants';


export function error(content = ERROR_MESSAGE) {
    message.error(content)
}

export function success(content = SUCCESS_MESSAGE) {
    message.success(content,2)
}

export function conflict(content = CONFLICT_MESSAGE) {
    message.error(content)
}