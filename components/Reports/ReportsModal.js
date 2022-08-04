import { Modal } from "@mantine/core";
import Report from "./Report";

export default function ReportsModal({
  reports_modal_opened,
  handleClose,
  reports,
}) {
  return (
    <>
      <Modal
        opened={reports_modal_opened}
        onClose={handleClose}
        closeOnClickOutside={false}
        title={
          <h1 className="text-md text-center text-black text-xl">Reports</h1>
        }
      >
        {reports &&
          reports.map((r, i) => {
            return <Report key={i} report={r} />;
          })}
      </Modal>
    </>
  );
}
