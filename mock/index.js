import Mock from "mockjs"
import {getRouteData} from "./data/indexData";
import http from "@/utils/request";

Mock.mock(`${http.getUri()}/route`, function () {
    return getRouteData();
});
