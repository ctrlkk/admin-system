import {ElMessage} from 'element-plus'

export function warn(message) {
    console.warn(...arguments);
}

export function error(message, errorInfo) {
    ElMessage.error(message);
    console.error(...arguments);
}

export function info(message) {
    console.info(...arguments);
}
