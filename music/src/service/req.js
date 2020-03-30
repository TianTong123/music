import apienv from "./env";
import { http } from "./http";


/**
 * @url 地址
 * @method 请求方法
 * @params 参数
 * @timeout 超时时间
 * @isLogin 是否登录接口
 * @isOriginalGET 是否传统get传参
 * @isFullLoading 是否启动全局遮罩
 * @isHalfLoading 是否启动局部遮罩
 */
const req = ({
  baseUrl,
  method,
  url,
  params,
  timeout,
  isOriginalGET,
  responseType,
  isFullLoading = false,
  isHalfLoading = true,
}) => {
  let options = {
    url: apienv.serer.baseUrl + url,//拼接地址
    method,
    params,
    timeout,
    responseType,
    isOriginalGET: isOriginalGET,
    isFullLoading,
    isHalfLoading
  };
  return http(options);
};

export { req };
