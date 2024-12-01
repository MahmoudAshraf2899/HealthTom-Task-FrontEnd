import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import logo from "../../Assets/Icons/Daginlogo.jpg";
import "./PrintPDF.css";
import pdfIcon from "../../Assets/Icons/PDF-icon.svg";
import moment from "moment";
import API from "../../Api";

const PrintBreederDetails = ({ dataToPrint }) => {
  const [farms, setFarms] = useState([]);
  const [breederNotes, setBreederNotes] = useState([]);
  useEffect(() => {
    moment.locale("en");
    API.get(`breeders/${dataToPrint.id}/farms`).then((res) => {
      if (res) {
        setFarms(res.data.items);
      }
    });
    API.get(`breeders/${dataToPrint.id}/notes`).then((res) => {
      if (res.status === 200) {
        setBreederNotes(res.data.items);
      }
    });
  }, []);

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `المربي : ${dataToPrint.name}`,
    onAfterPrint: () => console.log("Printed PDF successfully!"),
  });
  return (
    <>
      <div ref={componentRef} className="pass-content">
        <div className="grid grid-cols-2 p-4">
          <div className="col-span-full">
            <img src={logo} className="logo" />
          </div>
          <div className="col-start-1 flex  items-center gap-2 mt-4">
            <h3 className="Head-label">أسم المربي:</h3>
            <p className="label-content">{dataToPrint.name}</p>
          </div>
          <div className="col-start-2 flex justify-end items-center gap-2 mt-4">
            <p className="label-content">{dataToPrint.id}</p>
          </div>

          <div className="col-start-1 flex  items-center gap-2 mt-4">
            <h3 className="Head-label">المحافظة:</h3>
            <p className="label-content">
              <p className="label-content">
                {" "}
                {dataToPrint.governorate != null
                  ? dataToPrint.governorate.name
                  : ""}
              </p>
            </p>
          </div>

          <div className="col-start-2 flex justify-end items-center gap-2 mt-4">
            <h3 className="Head-label">المدينة:</h3>
            <p className="label-content">
              {dataToPrint.city != null ? dataToPrint.city.name : ""}
            </p>
          </div>

          <div className="col-start-1 flex  items-center gap-2 mt-4">
            <h3 className="Head-label">رقم الهاتف:</h3>
            <p className="label-content">
              <p className="label-content">{dataToPrint.mobile_number} </p>
            </p>
          </div>

          <div className="col-start-2 flex justify-end items-center gap-2 mt-4">
            <h3 className="Head-label">رقم الواتساب:</h3>
            <p className="label-content">{dataToPrint.whatsapp_number}</p>
          </div>

          <div className="col-start-1 flex  items-center gap-2 mt-4">
            <h3 className="Head-label">البريد الألكتروني:</h3>
            <p className="label-content">{dataToPrint.email}</p>
          </div>

          <div className="col-start-2 flex justify-end items-center gap-2 mt-4">
            <h3 className="Head-label">حجم التربية التقريبي:</h3>

            <p className="label-content">{dataToPrint.approx_breeding_size}</p>
          </div>

          <div className="col-start-1 flex  items-center gap-2 mt-4">
            <h3 className="Head-label">نوع النشاط:</h3>
            <p className="label-content">
              {dataToPrint.activity_type_id === 1
                ? "فردي"
                : dataToPrint.activity_type_id === 2
                ? "مؤسسي"
                : ""}
            </p>
          </div>

          <div className="col-start-2 flex justify-end items-center gap-2 mt-4">
            <h3 className="Head-label">الحالة:</h3>

            <p className="label-content">
              {dataToPrint.account_status === 2 ? "مفعل" : "غير مفعل"}
            </p>
          </div>

          <div className="col-start-1 flex  items-center gap-2 mt-4">
            <h3 className="Head-label">تربية منزلية:</h3>
            <p className="label-content">
              {dataToPrint.home_breeding === 1 ? "نعم" : "لا"}
            </p>
          </div>

          <div className="col-start-2 flex justify-end items-center gap-2 mt-4">
            <h3 className="Head-label">مربي اعمار:</h3>
            <p className="label-content">
              {dataToPrint.incubator === 1 ? "نعم" : "لا"}
            </p>
          </div>
          <div className="col-start-1 flex  items-center gap-2 mt-4">
            <h3 className="Head-label">عدد العنابر:</h3>
            <p className="label-content">{dataToPrint.farms_count}</p>
          </div>

          <div className="col-start-2 flex justify-end items-center gap-2 mt-4">
            <h3 className="Head-label">عدد دورات التسكين:</h3>
            <p className="label-content">
              {dataToPrint.farmsStatistics != null
                ? dataToPrint.farmsStatistics.totalHousingCount
                : 0}
            </p>
          </div>

          <div className="col-start-1 flex  items-center gap-2 mt-4">
            <h3 className="Head-label">عدد دورات التسكين النشطة:</h3>
            <p className="label-content">
              {" "}
              {dataToPrint.farmsStatistics != null
                ? dataToPrint.farmsStatistics.activeHousingCount
                : 0}
            </p>
          </div>

          <div className="col-start-2 flex justify-end items-center gap-2 mt-4">
            <h3 className="Head-label">عدد العنابر النشطة:</h3>
            <p className="label-content">
              {dataToPrint.farmsStatistics != null
                ? dataToPrint.farmsStatistics.activeFarmsCount
                : 0}
            </p>
          </div>

          <div className="col-start-1 flex  items-center gap-2 mt-4">
            <h3 className="Head-label">طريقة الدفع:</h3>
            <p className="label-content">{dataToPrint.pay_method}</p>
          </div>

          <div className="col-span-full">
            <div className="divider"></div>
          </div>
          {/* العنابر */}
          <div className="col-start-1 flex  items-center gap-2 mt-2">
            <h3 className="Head-label">عنابر المربي</h3>
          </div>
          <div className="col-span-full mt-4">
            <div className="flex w-full overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>الرقم التعريفي</th>
                    <th>المساحة</th>
                    <th>المحافظة </th>
                    <th>المدينة </th>
                  </tr>
                </thead>
                {farms.length > 0 ? (
                  <>
                    <tbody>
                      {farms.map((item) => (
                        <tr>
                          <th> {item.id}</th>
                          <td>{item.area}</td>
                          <td>
                            {item.governorate != null
                              ? item.governorate.name
                              : ""}
                          </td>
                          <td>{item.city != null ? item.city.name : ""}</td>
                        </tr>
                      ))}
                    </tbody>
                  </>
                ) : null}
              </table>
            </div>
          </div>

          {/* ملاحظات المربي */}
          <div className="col-start-1 flex  items-center gap-2 mt-8">
            <h3 className="Head-label">ملاحظات المربي</h3>
          </div>
          <div className="col-span-full mt-4">
            <div className="flex w-full overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>العنوان</th>
                    <th>التفاصيل</th>
                    <th>التاريخ</th>
                    <th>نوع الملاحظة</th>
                    <th>العنبر</th>
                  </tr>
                </thead>
                {breederNotes.length > 0 ? (
                  <>
                    <tbody>
                      {breederNotes.map((item, index) => (
                        <tr key={index}>
                          <td>{item.noteTitle}</td>
                          <td className="text-balance">{item.details}</td>
                          <th>
                            {moment(item.created_at).format("YYYY-MM-DD")}
                          </th>

                          <td>
                            {item.note_type != null ? (
                              <>{item.note_type.note}</>
                            ) : (
                              ""
                            )}
                          </td>
                          <td>
                            {item.farm != null ? <>{item.farm.name}</> : ""}
                          </td>
                        </tr>
                      ))}
                      <tr></tr>
                    </tbody>
                  </>
                ) : null}
              </table>
            </div>
          </div>
        </div>
      </div>
      <button onClick={handlePrint}>
        <img src={pdfIcon} className="pdf-icon" alt="logo-view" />
      </button>
    </>
  );
};

export default PrintBreederDetails;
