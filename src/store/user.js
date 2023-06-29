import {defineStore} from "pinia";

export const user = defineStore('user', {
    state: () => {
        return {
            loginInfo: {
                time: null,// 登入时间
                token: null// 令牌
            }
        }
    }
})
