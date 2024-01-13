export default function About({ total }) {
  return (
    <>
      <div className="section_two" id="about">
        <div className="d-flex justify-content-center">
          <img src="Asset/Unitease_logo_big.png" alt="" width="600" />
        </div>
        <div className="d-flex justify-content-center mb-5">
          <h6 className="text-black fw-light">See More About UNITease</h6>
        </div>
        <div className="row text-center justify-content-center gap-5 mb-5">
          <div className="col-6 col-md-3 div-about">
            <p className="text-black">UNITease adalah sebuah sistem inovatif yang dirancang khusus untuk mempermudah Unit Kegiatan Mahasiswa di Politeknik Negeri Semarang dalam menjalankan berbagai aktivitas mereka.</p>
          </div>
          <div className="col-6 col-md-3 div-about">
            <p className="text-black">
              UNITease memberikan solusi yang efisien untuk manajemen piket, koordinasi timeline kegiatan dan pendaftaran calon anggota baru, memastikan bahwa UKM di Politeknik Negeri Semarang dapat beroperasi secara lebih efektif dan
              produktif.
            </p>
          </div>
          <div className="col-6 col-md-3 div-about">
            <p className="text-black">UNITease menjadi wadah bagi mahasiswa untuk meregenerasi dan menyalurkan potensi non akademik mereka agar dapat diwujudkan melalui prestasi di tingkat nasional maupun internasional.</p>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <div className="ukm-count">
            <p className="text-black fs-1">{total}</p>
            <p className="text-black fs-5">UKM TERSEDIA</p>
          </div>
        </div>
      </div>
    </>
  );
}
