const worker = new Worker("worker.js");

worker.onmessage = (e) => {
  const canvas = document.querySelector("#canvas-for-rasterized-svg");
  const imageBitmap = e.data;
  canvas.width = imageBitmap.width;
  canvas.height = imageBitmap.height;
  const canvasCtx = canvas.getContext("2d");
  canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
  canvasCtx.drawImage(imageBitmap, 0, 0);
};

document
  .querySelector("#frame-for-rasterized-svg")
  .addEventListener("load", function () {
    //create new MessageChannel
    const msgChannel = new MessageChannel();
    //port1 => iframe
    this.contentWindow.postMessage(null, "*", [msgChannel.port1]);
    //port2 => webworker
    worker.postMessage(null, [msgChannel.port2]);
  });
