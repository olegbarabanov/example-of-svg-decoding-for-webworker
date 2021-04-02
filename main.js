const worker = new Worker("worker.js");

worker.onmessage = (e) => {
  const canvas = document.createElement("canvas");
  const imageBitmap = e.data;
  canvas.width = imageBitmap.width;
  canvas.height = imageBitmap.height;
  const canvasCtx = canvas.getContext("2d");
  canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
  canvasCtx.drawImage(imageBitmap, 0, 0);
  document.body.appendChild(canvas);
};

document
  .querySelector("#frame-for-rasterized-svg")
  .addEventListener("load", () => {
    //create new MessageChannel
    const msgChannel = new MessageChannel();
    //port1 => iframe
    iframe.contentWindow.postMessage(null, "*", [msgChannel.port1]);
    //port2 => webworker
    worker.postMessage(null, [msgChannel.port2]);
  });
