import Mock from "mockjs"
import {getMenuData} from "./data/indexData";
import http from "@/utils/request";

Mock.mock(`${http.getUri()}/menuData`, function () {
    return getMenuData();
});
