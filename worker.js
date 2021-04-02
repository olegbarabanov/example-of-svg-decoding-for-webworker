self.onmessage = (e) => {
    // just an example
    const url = 'example.svg';
    const mainPort = e.ports[0];
    const msgChannel = new MessageChannel();
    mainPort.postMessage(url, [msgChannel.port2]);
    msgChannel.port1.onmessage = (e) => {
      const imageBitmap = e.data;
      postMessage(imageBitmap, [imageBitmap]);
    };
};