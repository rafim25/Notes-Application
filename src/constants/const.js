export const SERVICEENDPOINT = "http://localhost:4000";
export const getRequestOption = (requestType, requestObj) =>
  requestObj
    ? {
        method: requestType,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestObj),
      }
    : {
        method: requestType,
        headers: {
          "Content-Type": "application/json",
        },
      };

export function callService(path, type, callBack, body) {
  fetch(`${SERVICEENDPOINT}/${path}`, getRequestOption(type, body))
    .then((res) => {
      res.json().then((res) => {
        callBack(res);
      });
    })
    .catch((error) => {
      console.log("error");
    });
}
