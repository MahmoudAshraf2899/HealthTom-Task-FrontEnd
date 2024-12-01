import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style";
import "../../Components/Missions/MissionsHeader/MissionsHeader.scss";
import excel from "../../Assets/Icons/excel2-svgrepo-com.svg";
import moment from "moment";

import API from "../../Api";
type ExportExcelProps = {
  url: string;
  fileName: string;
  page: string;
};
export const ExportExcel = (props: ExportExcelProps) => {
  const fileType = `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8`;
  const fileExtension = `.xlsx`;

  const calculateDays = (itemDate: any): number => {
    // Convert both dates to milliseconds
    // Parse the date string into a Date object
    const dateParts = itemDate.split("-");
    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 1; // Months are 0-based in JavaScript
    const day = parseInt(dateParts[2]);
    const parsedDate = new Date(year, month, day);
    const startMilliseconds = parsedDate.getTime();
    const endMilliseconds = new Date().getTime();

    // Calculate the difference in milliseconds
    const differenceMilliseconds = Math.abs(
      endMilliseconds - startMilliseconds
    );

    // Convert milliseconds to days
    const millisecondsInADay = 1000 * 60 * 60 * 24;
    const days = Math.floor(differenceMilliseconds / millisecondsInADay);

    return days;
  };
  const exportToExcel = async () => {
    let filtered: any[] = [];
    API.get(props.url).then((res: any) => {
      if (res.data.items !== undefined && res.data.items.length > 0) {
        switch (props.page) {
          case "AllMissions":
            filtered = res.map(
              ({
                farm_id,
                farm_name,
                farm_status,
                f_area,
                farming_type,
                farm_capacity,
                f_photo,
                f_gov,
                f_city,
                f_village,
                f_f_address,
                f_lat,
                f_lng,
                f_created_at,
                breeder_id,
                breeder_name,
                breeder_phone,
                breeder_created_at,
                breeder_address,
                breeder_village,
                breeder_city,
                breeder_gov,
                created_by_name,
                created_by_phone,
                mission_id,
                m_f_addr,
                m_name,
                m_audience,
                m_status,
                m_created_at,
                m_due_at,
                m_type,
                housing_id,
                housing_created_at,
                housing_date,
                expected_sale_date,
                housing_count,
                current_feed_type,
                housing_dajin_company,
                housing_dajin,
                h_dajin_breed,
                badi_price,
                nami_price,
                nahi_price,
                h_feed_co,
              }: any) => ({
                farm_id,
                farm_name,
                farm_status,
                f_area,
                farming_type,
                farm_capacity,
                f_photo,
                f_gov,
                f_city,
                f_village,
                f_f_address,
                f_lat,
                f_lng,
                f_created_at,
                breeder_id,
                breeder_name,
                breeder_phone,
                breeder_created_at,
                breeder_address,
                breeder_village,
                breeder_city,
                breeder_gov,
                created_by_name,
                created_by_phone,
                mission_id,
                m_f_addr,
                m_name,
                m_audience,
                m_status,
                m_created_at,
                m_due_at,
                m_type,
                housing_id,
                housing_created_at,
                housing_date,
                expected_sale_date,
                housing_count,
                current_feed_type,
                housing_dajin_company,
                housing_dajin,
                h_dajin_breed,
                badi_price,
                nami_price,
                nahi_price,
                h_feed_co,
              })
            );
            break;

          case "MissionHistory":
            filtered = res.data.items.map(
              ({
                id,
                created_at,
                name,
                reward,
                due_at,
                early_bonus,
                early_bonus_due_at,
                breeder,

                type,
                status,
              }: any) => ({
                id,
                created_at: moment(created_at).format("YYYY-MM-DD"),
                name,
                price: reward,
                finished_at: moment(due_at).format("YYYY-MM-DD"),
                early_bonus,
                early_bonus_due_at:
                  moment(early_bonus_due_at).format("YYYY-MM-DD"),
                breeder: breeder?.name,
                breeder_Mobile: breeder?.mobile_number,
                type: type?.name,
                status:
                  status === "in_progress"
                    ? "تحت التنفيذ"
                    : status === "pending"
                    ? "لم تستند بعد"
                    : status === "revision"
                    ? "مهمة تامة تنتظر التقييم"
                    : status === "late"
                    ? "مهمة متأخرة"
                    : status === "completed"
                    ? "مهمة تامة"
                    : "مهمة مرفوضة",
              })
            );
            break;

          case "Pending":
            filtered = res.data.items.map(
              ({
                id,
                created_at,
                name,
                reward,
                due_at,
                early_bonus,
                early_bonus_due_at,
                breeder,

                type,
                status,
              }: any) => ({
                id,
                created_at: moment(created_at).format("YYYY-MM-DD"),
                name,
                price: reward,
                finished_at: moment(due_at).format("YYYY-MM-DD"),
                early_bonus,
                early_bonus_due_at:
                  moment(early_bonus_due_at).format("YYYY-MM-DD"),
                breeder: breeder?.name,
                breeder_Mobile: breeder?.mobile_number,
                type: type?.name,
                status:
                  status === "in_progress"
                    ? "تحت التنفيذ"
                    : status === "pending"
                    ? "لم تستند بعد"
                    : status === "revision"
                    ? "مهمة تامة تنتظر التقييم"
                    : status === "late"
                    ? "مهمة متأخرة"
                    : status === "completed"
                    ? "مهمة تامة"
                    : "مهمة مرفوضة",
              })
            );
            break;

          case "in_progress":
            filtered = res.data.items.map(
              ({
                id,
                created_at,
                name,
                reward,
                due_at,
                early_bonus,
                early_bonus_due_at,
                breeder,

                type,
                status,
              }: any) => ({
                id,
                created_at: moment(created_at).format("YYYY-MM-DD"),
                name,
                price: reward,
                finished_at: moment(due_at).format("YYYY-MM-DD"),
                early_bonus,
                early_bonus_due_at:
                  moment(early_bonus_due_at).format("YYYY-MM-DD"),
                breeder: breeder?.name,
                breeder_Mobile: breeder?.mobile_number,
                type: type?.name,
                status: "تحت التنفيذ",
              })
            );
            break;

          case "revision":
            filtered = res.data.items.map(
              ({
                id,
                created_at,
                name,
                reward,
                due_at,
                early_bonus,
                early_bonus_due_at,
                breeder,

                type,
                status,
              }: any) => ({
                id,
                created_at: moment(created_at).format("YYYY-MM-DD"),
                name,
                price: reward,
                finished_at: moment(due_at).format("YYYY-MM-DD"),
                early_bonus,
                early_bonus_due_at:
                  moment(early_bonus_due_at).format("YYYY-MM-DD"),
                breeder: breeder?.name,
                breeder_Mobile: breeder?.mobile_number,
                type: type?.name,
                status: "بأنتظار التأكيد",
              })
            );
            break;

          case "completed":
            filtered = res.data.items.map(
              ({
                id,
                created_at,
                name,
                reward,
                due_at,
                early_bonus,
                early_bonus_due_at,
                breeder,

                type,
                status,
              }: any) => ({
                id,
                created_at: moment(created_at).format("YYYY-MM-DD"),
                name,
                price: reward,
                finished_at: moment(due_at).format("YYYY-MM-DD"),
                early_bonus,
                early_bonus_due_at:
                  moment(early_bonus_due_at).format("YYYY-MM-DD"),
                breeder: breeder?.name,
                breeder_Mobile: breeder?.mobile_number,
                type: type?.name,
                status: "تامة",
              })
            );
            break;

          case "late":
            filtered = res.data.items.map(
              ({
                id,
                created_at,
                name,
                reward,
                due_at,
                early_bonus,
                early_bonus_due_at,
                breeder,

                type,
                status,
              }: any) => ({
                id,
                created_at: moment(created_at).format("YYYY-MM-DD"),
                name,
                price: reward,
                finished_at: moment(due_at).format("YYYY-MM-DD"),
                early_bonus,
                early_bonus_due_at:
                  moment(early_bonus_due_at).format("YYYY-MM-DD"),
                breeder: breeder?.name,
                breeder_Mobile: breeder?.mobile_number,
                type: type?.name,
                status: "متأخرة",
              })
            );
            break;

          case "rejected":
            filtered = res.data.items.map(
              ({
                id,
                created_at,
                name,
                reward,
                due_at,
                early_bonus,
                early_bonus_due_at,
                breeder,

                type,
                status,
              }: any) => ({
                id,
                created_at: moment(created_at).format("YYYY-MM-DD"),
                name,
                price: reward,
                finished_at: moment(due_at).format("YYYY-MM-DD"),
                early_bonus,
                early_bonus_due_at:
                  moment(early_bonus_due_at).format("YYYY-MM-DD"),
                breeder: breeder?.name,
                breeder_Mobile: breeder?.mobile_number,
                type: type?.name,
                status: "مرفوضة",
              })
            );
            break;

          case "AllFarms":
            filtered = res.data.items.map(
              ({
                id,
                name,
                area,
                village,
                full_address,
                created_at,
                housing_count,
                status,
                user,
                farmingType,
                ventilationType,
                governorate,
                city,
              }: any) => ({
                id,
                name,
                area,
                village,
                full_address,
                created_at: moment(created_at).format("YYYY-MM-DD"),
                housing_count,
                status: status?.status,
                breeder: user?.name,
                breeder_number: user?.mobile_number,
                farmingType: farmingType?.type,
                ventilationType: ventilationType?.type,
                governorate: governorate?.name,
                city: city?.name,
              })
            );
            break;

          case "AllBreedHousing":
            filtered = res.data.items.map(
              ({
                id,
                other_brooder_co,
                other_feed_co,
                count,
                housing_date,
                expected_sale_date,
                end_at,
                farm,
                dajinBreed,
                company,
                feedCompany,
              }: any) => ({
                id,
                other_brooder_co,
                other_feed_co,
                count,
                housing_date: moment(housing_date).format("YYYY-MM-DD"),
                expected_sale_date:
                  moment(expected_sale_date).format("YYYY-MM-DD"),
                end_at: moment(end_at).format("YYYY-MM-DD"),
                farm: farm?.name,
                farm_owner: farm?.user?.name,
                dajinBreed: dajinBreed?.breed_type,
                dajinType: dajinBreed?.dajinType.type,
                company: company?.name,
                feedCompany: feedCompany?.name,
              })
            );
            break;

          case "FarmsInprogress":
            filtered = res.data.items.map(
              ({
                id,
                name,
                area,
                village,
                full_address,
                created_at,
                housing_count,
                status,
                user,
                farmingType,
                ventilationType,
                governorate,
                city,
              }: any) => ({
                id,
                name,
                area,
                village,
                full_address,
                created_at: moment(created_at).format("YYYY-MM-DD"),
                housing_count,
                status: status?.status,
                breeder: user?.name,
                breeder_number: user?.mobile_number,
                farmingType: farmingType?.type,
                ventilationType: ventilationType?.type,
                governorate: governorate?.name,
                city: city?.name,
              })
            );
            break;

          case "FarmsSuspend":
            filtered = res.data.items.map(
              ({
                id,
                name,
                area,
                village,
                full_address,
                created_at,
                housing_count,
                status,
                user,
                farmingType,
                ventilationType,
                governorate,
                city,
                suspensionReason,
              }: any) => ({
                id,
                name,
                area,
                village,
                full_address,
                created_at: moment(created_at).format("YYYY-MM-DD"),
                housing_count,
                status: status?.status,
                breeder: user?.name,
                breeder_number: user?.mobile_number,
                farmingType: farmingType?.type,
                ventilationType: ventilationType?.type,
                governorate: governorate?.name,
                city: city?.name,
                suspend_reason:
                  suspensionReason?.reason_id === "4"
                    ? suspensionReason?.other_reason
                    : suspensionReason?.reason,
                suspend_since: moment(suspensionReason?.created_at).format(
                  "YYYY-MM-DD"
                ),
                suspend_since_days: calculateDays(suspensionReason?.created_at),
              })
            );
            break;

          case "FarmsReadyToSale":
            filtered = res.data.items.map(
              ({
                id,
                name,
                area,
                village,
                full_address,
                created_at,
                housing_count,
                status,
                user,
                farmingType,
                ventilationType,
                governorate,
                city,
              }: any) => ({
                id,
                name,
                area,
                village,
                full_address,
                created_at: moment(created_at).format("YYYY-MM-DD"),
                housing_count,
                status: status?.status,
                breeder: user?.name,
                breeder_number: user?.mobile_number,
                farmingType: farmingType?.type,
                ventilationType: ventilationType?.type,
                governorate: governorate?.name,
                city: city?.name,
              })
            );
            break;

          case "EmptyFarms":
            filtered = res.data.items.map(
              ({
                id,
                name,
                area,
                empty_at,
                village,
                full_address,
                created_at,
                housing_count,
                status,
                user,
                farmingType,
                ventilationType,
                governorate,
                city,
              }: any) => ({
                id,
                name,
                area,
                empty_at: moment(empty_at).format("YYYY-MM-DD"),
                empty_at_since: empty_at != null ? calculateDays(empty_at) : "",
                village,
                full_address,
                created_at: moment(created_at).format("YYYY-MM-DD"),
                housing_count,
                status: status?.status,
                breeder: user?.name,
                breeder_number: user?.mobile_number,
                farmingType: farmingType?.type,
                ventilationType: ventilationType?.type,
                governorate: governorate?.name,
                city: city?.name,
              })
            );
            break;

          case "Breeders":
            filtered = res.data.items.map(
              ({
                id,
                name,
                mobile_number,
                whatsapp_number,
                full_address,
                created_at,
                account_status,
                activity_type_id,
                approx_breeding_size,
                farms_count,
                home_breeding,
                incubator,
                pay_method,
                governorate,
                city,
                village,
                farmsStatistics,
              }: any) => ({
                id,
                name,
                mobile_number,
                whatsapp_number,
                full_address,
                created_at: moment(created_at).format("YYYY-MM-DD"),
                account_status: account_status === 2 ? "مفعل" : "غير مفعل",
                activity_type:
                  activity_type_id === 1
                    ? "فردي"
                    : activity_type_id === 2
                    ? "مؤسسي"
                    : "",
                approx_breeding_size: approx_breeding_size,
                farms_count: farms_count,
                home_breeding: home_breeding === 1 ? "تربية منزلية" : "",
                incubator: incubator === 1 ? "مربي أعمار" : "",
                pay_method: pay_method,
                governorate: governorate?.name,
                city: city?.name,
                village: village,
                activeFarmsCount: farmsStatistics?.activeFarmsCount,
                activeHousingCount: farmsStatistics?.activeHousingCount,
                housedBirdsCount: farmsStatistics?.housedBirdsCount,
                totalHousingCount: farmsStatistics?.totalHousingCount,
              })
            );
            break;

          case "ActiveUsers":
            filtered = res.data.items.map(
              ({
                id,
                name,
                mobile_number,
                whatsapp_number,
                full_address,
                governorate,
                city,
                created_at,
                settled_balance,
                total_income,
                sales_farms_count,
                total_early_bonus,
                completed_missions_count,
                all_missions_count,
                inprogress_missions_count,
                late_missions_count,
                in_review_missions_count,
                created_missions_count,
              }: any) => ({
                id,
                name,
                mobile_number,
                whatsapp_number,
                full_address,
                governorate: governorate?.name,
                city: city?.name,
                created_at: moment(created_at).format("YYYY-MM-DD"),
                settled_balance,
                total_income,
                sales_farms_count,
                total_early_bonus,
                completed_missions_count,
                all_missions_count,
                inprogress_missions_count,
                late_missions_count,
                in_review_missions_count,
                created_missions_count,
              })
            );
            break;

          case "StoppedUsers":
            filtered = res.data.items.map(
              ({
                id,
                name,
                mobile_number,
                whatsapp_number,
                full_address,
                governorate,
                city,
                created_at,
                settled_balance,
                total_income,
                sales_farms_count,
                total_early_bonus,
                completed_missions_count,
                all_missions_count,
                inprogress_missions_count,
                late_missions_count,
                in_review_missions_count,
                created_missions_count,
              }: any) => ({
                id,
                name,
                mobile_number,
                whatsapp_number,
                full_address,
                governorate: governorate?.name,
                city: city?.name,
                created_at: moment(created_at).format("YYYY-MM-DD"),
                settled_balance,
                total_income,
                sales_farms_count,
                total_early_bonus,
                completed_missions_count,
                all_missions_count,
                inprogress_missions_count,
                late_missions_count,
                in_review_missions_count,
                created_missions_count,
              })
            );
            break;

          case "SettledUsers":
            filtered = res.data.items.map(({ id, name }: any) => ({
              id,
              name,
            }));
            break;

          case "Traders":
            filtered = res.data.items.map(
              ({
                id,
                name,
                mobile_number,
                whatsapp_number,
                full_address,
                created_at,
                account_status,
                governorate,
                city,
                village,
                daily_loading_capacity,
              }: any) => ({
                id,
                name,
                mobile_number,
                whatsapp_number,
                full_address,
                created_at: moment(created_at).format("YYYY-MM-DD"),
                account_status: account_status === 2 ? "مفعل" : "غير مفعل",
                governorate: governorate?.name,
                city: city?.name,
                village: village,
                daily_loading_capacity: daily_loading_capacity,
              })
            );
            break;

          default:
            break;
        }
        const ws = XLSX.utils.json_to_sheet(filtered);
        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
        var x = wb.Sheets.data;
        console.log("🚀 ~ API.get ~ x:", x);
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, props.fileName + fileExtension);
      } else if (res.data !== undefined && res.data.length > 0) {
        const ws = XLSX.utils.json_to_sheet(res.data);
        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, props.fileName + fileExtension);
      }
    });
  };
  return (
    <div className="MissionsHeader flex justify-end pl-8">
      <div className="filter-section flex" onClick={() => exportToExcel()}>
        <img
          src={excel}
          alt="excelIcon"
          style={{
            height: "25px",
            width: "25px",
          }}
          loading="lazy"
        />
        {props.page === `AllBreedHousing` ? (
          <span className="excel-span">دورات التسكين</span>
        ) : (
          <span className="excel-span">تصدير</span>
        )}
      </div>
    </div>
  );
};
