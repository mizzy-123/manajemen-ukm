"use client";

import postSessionQrCode from "@/api/postSessionQrCode";
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function ActionQrCode({ qr }) {
  const sessions = (...args) =>
    fetch(...args, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }).then((res) => res.json());

  const { data: dataQr, isLoading: loadingQr } = useSWR(`${process.env.NEXT_PUBLIC_WHATSAPP_SERVER}/sessions/mizzy/status`, sessions, {
    refreshInterval: 1000,
  });

  const [loading, setLoading] = useState(true);
  const [qrcode, setQrcode] = useState("");

  // useEffect(() => {
  //   setLoading(true);
  //   async function fetchData() {
  //     const qr = await postSessionQrCode({ sessionId: "aaaa" });
  //     setQrcode(await qr.data.qr);
  //     console.log("qrcode", qr.data);
  //   }
  //   fetchData();
  // }, []);
  console.log("qrstate", qr);
  return <>{loadingQr ? <p>Loading...</p> : dataQr.status !== "AUTHENTICATED" ? <img width={300} src={qr.qr} alt="" /> : <img width={300} src={`${process.env.NEXT_PUBLIC_APP_URL}/images/ceklist.png`} alt="" />}</>;
}
