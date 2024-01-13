import postSessionQrCode from "@/api/postSessionQrCode";
import ActionQrCode from "./actionQrCode";

export default async function Scan() {
  try {
    const qr = await postSessionQrCode({ sessionId: "mizzy" });
    return (
      <div className="nk-content">
        <div className="container-fluid">
          <div className="nk-content-inner">
            <div className="nk-content-body">
              <div className="nk-block nk-block-lg">
                <div className="nk-block-head">
                  <div className="nk-block-head-content">
                    <h4 className="nk-block-title">Scan</h4>
                  </div>
                </div>
                <div className="card card-preview">
                  <p>Hello world</p>
                  <ActionQrCode qr={qr.status == 200 ? qr.data : { qr: "" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="nk-content">
        <div className="container-fluid">
          <div className="nk-content-inner">
            <div className="nk-content-body">
              <div className="nk-block nk-block-lg">
                <div className="nk-block-head">
                  <div className="nk-block-head-content">
                    <h4 className="nk-block-title">Scan</h4>
                  </div>
                </div>
                <div className="card card-preview">
                  <p>Hello world</p>
                  <ActionQrCode qr={{ qr: "" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
