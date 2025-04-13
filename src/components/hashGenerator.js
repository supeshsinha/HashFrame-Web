const generateHash = (files) => {
    console.log(files[0]);
    // files will be an array of files, even if only one file is selected  
      const file = files[0];
      // start a new instance of FileReader
      const reader = new FileReader();
  
        
      return new Promise((resolve, reject) =>{
        reader.onload = () => {
            const dataUrl = reader.result; // e.g., data:image/jpeg;base64,/9j/4AAQSk...
            const base64 = dataUrl.split(',')[1]; // ✅ Strip the MIME prefix

            // Encode the base64 string as a UTF-8 byte array
            const encoded = new TextEncoder().encode(base64);
            
            crypto.subtle.digest('SHA-256', encoded).then((hash) => {
              var sha256result = hex(hash);
              // this should contain your sha-256 hash value
              console.log(sha256result);
              resolve(sha256result);
            });
        };

        reader.onerror = () => {
            reject('oops, something went wrong with the file reader.')
        }
      
          // calling reader.readAsArrayBuffer and providing a file should trigger the callback above 
          // as soon as readAsArrayBuffer is complete
          reader.readAsDataURL(file);
      });  
  }
    
  
  // this function was taken from https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest#Example
  function hex(buffer) {
    var hexCodes = [];
    var view = new DataView(buffer);
    for (var i = 0; i < view.byteLength; i += 4) {
      // Using getUint32 reduces the number of iterations needed (we process 4 bytes each time)
      var value = view.getUint32(i)
      // toString(16) will give the hex representation of the number without padding
      var stringValue = value.toString(16)
      // We use concatenation and slice for padding
      var padding = '00000000'
      var paddedValue = (padding + stringValue).slice(-padding.length)
      hexCodes.push(paddedValue);
    }
  
    // Join all the hex strings into one
    return hexCodes.join("");
  }


  export default generateHash;