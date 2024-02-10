import './App.css';

function App() {
  async function takeSnapshot() {
    const webcamElement = document.getElementById("webcam");
    const canvasElement = document.createElement("canvas");
    canvasElement.width = webcamElement.videoWidth;
    canvasElement.height = webcamElement.videoHeight;
    const canvas = canvasElement.getContext("2d");
    canvas.drawImage(webcamElement, 0, 0, webcamElement.videoWidth, webcamElement.videoHeight);
    const foto = canvasElement.toDataURL("image/png");
    const fecha = new Date();
    const response = await fetch("http://localhost:2024/InsertPersona", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ foto, fecha }),
    });
    const data = await response.json();
    console.log(data);

  }


  async function startWebcam() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const webcamElement = document.getElementById("webcam");
      webcamElement.srcObject = stream;
    } catch (error) {
      console.error("Error accediendo a la  webcam:", error);
    }
  }
  startWebcam();

  return (
    <div className="App">
      <header className="App-header">
        <video id="webcam" autoPlay playsInline muted></video>


        <button id="boton" onClick={takeSnapshot}>Tomar foto</button>

      </header>
    </div>
  );
}

export default App;
