import axios from "axios";
export default async function postSessionQrCode({ sessionId }) {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_WHATSAPP_SERVER}/sessions/add`,
    {
      sessionId: sessionId,
    },
    {
      headers: {
        Accept: "application/json",
      },
    }
  );
  return response;
}
