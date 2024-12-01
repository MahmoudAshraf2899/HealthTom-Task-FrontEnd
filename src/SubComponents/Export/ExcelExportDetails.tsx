import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import excel from "../../Assets/Icons/excel2-svgrepo-com.svg";
import "../../Components/Missions/MissionsHeader/MissionsHeader.scss";
import API from "../../Api";

const ExcelJS = require("exceljs");
type ExcelExportDetailsProps = {
  data: any;
  title: string;
  url: string;
  type: number;
};
export const ExcelExportDetails = (props: ExcelExportDetailsProps) => {
  const stateFromWalletsSlice = useSelector((state: any) => state.wallets);
  const [data, setData] = useState([]);

  const exportExcelFile = () => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("My Sheet");
    sheet.properties.defaultRowHeight = 40;

    // sheet.getRow(1).border = {
    //   top: { style: "thick", color: { argb: "FFFF0000" } },
    //   left: { style: "thick", color: { argb: "000000FF" } },
    //   bottom: { style: "thick", color: { argb: "F08080" } },
    //   right: { style: "thick", color: { argb: "FF00FF00" } },
    // };

    // sheet.getRow(1).fill = {
    //   type: "pattern",
    //   pattern: "darkVertical",
    //   fgColor: { argb: "FFFF00" },
    // };

    // sheet.getRow(1).font = {
    //   name: "Comic Sans MS",
    //   family: 4,
    //   size: 16,
    //   bold: true,
    // };
    if (
      props.type === 1 ||
      props.type === 2 ||
      props.type === 3 ||
      props.type === 4
    ) {
      ExportWallets(sheet, stateFromWalletsSlice, props, setData, workbook);
    }
  };

  const exportExcelBreedersFile = () => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Breeders");
    const sheet2 = workbook.addWorksheet("Farms");
    sheet.properties.defaultRowHeight = 40;

    // sheet.getRow(1).border = {
    //   top: { style: "thick", color: { argb: "FFFF0000" } },
    //   left: { style: "thick", color: { argb: "000000FF" } },
    //   bottom: { style: "thick", color: { argb: "F08080" } },
    //   right: { style: "thick", color: { argb: "FF00FF00" } },
    // };

    // sheet.getRow(1).fill = {
    //   type: "pattern",
    //   pattern: "darkVertical",
    //   fgColor: { argb: "FFFF00" },
    // };

    // sheet.getRow(1).font = {
    //   name: "Comic Sans MS",
    //   family: 4,
    //   size: 16,
    //   bold: true,
    // };

    ExportBreedersSheets(
      sheet,
      sheet2,
      stateFromWalletsSlice,
      props,
      setData,
      workbook
    );
  };
  return (
    <div className="MissionsHeader flex justify-end pl-8">
      <div
        className="filter-section flex"
        onClick={() =>
          props.type === 5 ? exportExcelBreedersFile() : exportExcelFile()
        }
      >
        <img
          src={excel}
          alt="excelIcon"
          style={{
            height: "25px",
            width: "25px",
          }}
          loading="lazy"
        />
        تصدير
      </div>
    </div>
  );
};
function ExportWallets(
  sheet: any,
  stateFromWalletsSlice: any,
  props: ExcelExportDetailsProps,
  setData: React.Dispatch<React.SetStateAction<never[]>>,
  workbook: any
) {
  sheet.columns = [
    {
      header: "التاريخ",
      key: "date",
      width: 10,
    },
    { header: "المندوب", key: "salesman", width: 32 },
    {
      header: "مبلغ دائن",
      key: "credit",
      width: 20,
    },
    {
      header: "مبلغ مدين",
      key: "depit",
      width: 20,
    },
    {
      header: "الرصيد",
      key: "balance",
      width: 15,
    },
    {
      header: "البيان",
      key: "mission",
      width: 10,
    },
  ];
  const dateText =
    stateFromWalletsSlice.startDate === null ||
    stateFromWalletsSlice.finishDate === null
      ? `البيانات من تاريخ ${moment(new Date()).format(
          "DD-MM-YYYY"
        )} إلي تاريخ ${moment(new Date()).format("DD-MM-YYYY")}`
      : `البيانات من تاريخ ${moment(
          new Date(stateFromWalletsSlice.startDate)
        ).format("DD-MM-YYYY")} إلي تاريخ ${moment(
          new Date(stateFromWalletsSlice.finishDate)
        ).format("DD-MM-YYYY")}`;

  sheet.addRow({
    depit: dateText,
  });
  API.get(props.url).then((res) => {
    setData(res.data.items);
    const promise = Promise.all(
      res.data.items?.map(async (item: any, index: any) => {
        // const rowNumber = index + 1;
        sheet.addRow({
          date: moment(item.created_at).format("YYYY/MM/DD"),
          salesman: item.user != null ? item.user.name : "",
          credit: item.type === "دائنة" ? item.amount : 0,
          depit: item.type === "مدينة" ? item.amount : 0,
          balance: item.balance,
          mission: item.mission != null ? item.mission.id : "",
        });
      })
    );

    promise.then(() => {
      const priceCol = sheet.getColumn(5);

      // iterate over all current cells in this column
      priceCol.eachCell((cell: any) => {
        const cellValue = sheet.getCell(cell?.address).value;
        // add a condition to set styling
        // if (cellValue > 50 && cellValue < 1000) {
        //   sheet.getCell(cell?.address).fill = {
        //     type: "pattern",
        //     pattern: "solid",
        //     fgColor: { argb: "FF0000" },
        //   };
        // }
      });

      workbook.xlsx.writeBuffer().then(function (data: any) {
        const blob = new Blob([data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const url = window.URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        // anchor.download = "download.xlsx";
        anchor.download = `${props.title}.xlsx`;
        anchor.click();
        window.URL.revokeObjectURL(url);
      });
    });
  });
}

function ExportBreedersSheets(
  breedersSheet: any,
  farmsSheet: any,
  stateFromWalletsSlice: any,
  props: ExcelExportDetailsProps,
  setData: React.Dispatch<React.SetStateAction<never[]>>,
  workbook: any
) {
  breedersSheet.columns = [
    {
      header: "id",
      key: "id",
      width: 10,
    },
    { header: "name", key: "name", width: 32 },
    {
      header: "mobile_number",
      key: "mobile_number",
      width: 20,
    },
    {
      header: "whatsapp_number",
      key: "whatsapp_number",
      width: 20,
    },
    {
      header: "full_address",
      key: "full_address",
      width: 15,
    },
    {
      header: "created_at",
      key: "created_at",
      width: 10,
    },
    {
      header: "account_status",
      key: "account_status",
      width: 15,
    },
    {
      header: "activity_type",
      key: "activity_type",
      width: 10,
    },
    {
      header: "approx_breeding_size",
      key: "approx_breeding_size",
      width: 10,
    },
    {
      header: "farms_count",
      key: "farms_count",
      width: 15,
    },
    {
      header: "home_breeding",
      key: "home_breeding",
      width: 10,
    },
    {
      header: "incubator",
      key: "incubator",
      width: 10,
    },
    {
      header: "pay_method",
      key: "pay_method",
      width: 15,
    },
    {
      header: "governorate",
      key: "governorate",
      width: 10,
    },
    {
      header: "city",
      key: "city",
      width: 10,
    },
    {
      header: "village",
      key: "village",
      width: 10,
    },
    {
      header: "activeFarmsCount",
      key: "activeFarmsCount",
      width: 10,
    },
    {
      header: "activeHousingCount",
      key: "activeHousingCount",
      width: 10,
    },
    {
      header: "housedBirdsCount",
      key: "housedBirdsCount",
      width: 10,
    },
    {
      header: "totalHousingCount",
      key: "totalHousingCount",
      width: 10,
    },
  ];
  farmsSheet.columns = [
    {
      header: "id",
      key: "id",
      width: 10,
    },
    { header: "name", key: "name", width: 32 },
    {
      header: "area",
      key: "area",
      width: 20,
    },
    {
      header: "village",
      key: "village",
      width: 20,
    },
    {
      header: "full_address",
      key: "full_address",
      width: 15,
    },
    {
      header: "created_at",
      key: "created_at",
      width: 10,
    },
    {
      header: "housing_count",
      key: "housing_count",
      width: 10,
    },
    {
      header: "status",
      key: "status",
      width: 10,
    },
    {
      header: "breeder_id",
      key: "breeder_id",
      width: 10,
    },
    {
      header: "breeder",
      key: "breeder",
      width: 10,
    },
    {
      header: "breeder_number",
      key: "breeder_number",
      width: 10,
    },
    {
      header: "farmingType",
      key: "farmingType",
      width: 10,
    },
    {
      header: "ventilationType",
      key: "ventilationType",
      width: 10,
    },
    {
      header: "governorate",
      key: "governorate",
      width: 10,
    },
    {
      header: "city",
      key: "city",
      width: 10,
    },
  ];

  API.get(props.url).then((res) => {
    API.get(`farms?page=1&limit=1000000000&sort_by=id&sort_order=DESC`).then(
      (response) => {
        const promise2 = Promise.all(
          response.data.items?.map(async (entity: any, index: any) => {
            // const rowNumber = index + 1;
            farmsSheet.addRow({
              id: entity.id,
              name: entity.name,
              area: entity.area,
              village: entity.village,
              full_address: entity.full_address,
              created_at: moment(entity.created_at).format("YYYY/MM/DD"),
              housing_count: entity.housing_count,
              status: entity.status?.status,
              breeder_id: entity.user_id,
              breeder: entity.user?.name,
              breeder_number: entity.user?.mobile_number,
              farmingType: entity.farmingType?.type,
              ventilationType: entity.ventilationType?.type,
              governorate: entity.governorate?.name,
              city: entity.city?.name,
            });
          })
        );

        setData(res.data.items);
        const promise = Promise.all(
          res.data.items?.map(async (item: any, index: any) => {
            // const rowNumber = index + 1;
            breedersSheet.addRow({
              id: item.id,
              name: item.name,
              mobile_number: item.mobile_number,
              whatsapp_number: item.whatsapp_number,
              full_address: item.full_address,
              created_at: moment(item.created_at).format("YYYY-MM-DD"),
              account_status: item.account_status === 2 ? "مفعل" : "غير مفعل",
              activity_type:
                item.activity_type_id === 1
                  ? "فردي"
                  : item.activity_type_id === 2
                  ? "مؤسسي"
                  : "",
              approx_breeding_size: item.approx_breeding_size,
              farms_count: item.farms_count,
              home_breeding: item.home_breeding === 1 ? "تربية منزلية" : "",
              incubator: item.incubator === 1 ? "مربي أعمار" : "",
              pay_method: item.pay_method,
              governorate: item.governorate?.name,
              city: item.city?.name,
              village: item.village,
              activeFarmsCount: item.farmsStatistics?.activeFarmsCount,
              activeHousingCount: item.farmsStatistics?.activeHousingCount,
              housedBirdsCount: item.farmsStatistics?.housedBirdsCount,
              totalHousingCount: item.farmsStatistics?.totalHousingCount,
            });
          })
        );

        promise.then(() => {
          const priceCol = breedersSheet.getColumn(5);
          const priceCol2 = farmsSheet.getColumn(5);

          // iterate over all current cells in this column
          priceCol.eachCell((cell: any) => {
            const cellValue = breedersSheet.getCell(cell?.address).value;
            // add a condition to set styling
            // if (cellValue > 50 && cellValue < 1000) {
            //   sheet.getCell(cell?.address).fill = {
            //     type: "pattern",
            //     pattern: "solid",
            //     fgColor: { argb: "FF0000" },
            //   };
            // }
          });

          priceCol2.eachCell((cell: any) => {
            const cellValue = farmsSheet.getCell(cell?.address).value;
            // add a condition to set styling
            // if (cellValue > 50 && cellValue < 1000) {
            //   sheet.getCell(cell?.address).fill = {
            //     type: "pattern",
            //     pattern: "solid",
            //     fgColor: { argb: "FF0000" },
            //   };
            // }
          });

          workbook.xlsx.writeBuffer().then(function (data: any) {
            const blob = new Blob([data], {
              type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });
            const url = window.URL.createObjectURL(blob);
            const anchor = document.createElement("a");
            anchor.href = url;
            // anchor.download = "download.xlsx";
            anchor.download = `${props.title}.xlsx`;
            anchor.click();
            window.URL.revokeObjectURL(url);
          });
        });
      }
    );
  });
}
