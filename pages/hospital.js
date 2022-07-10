import { useState } from "react";
import { Modal, Button, Group } from "@mantine/core";
import { Input } from "@mantine/core";

export default function Hospital() {
  const [doctor_entry_opened, setDoctorEntryOpened] = useState(false);
  const [emergency_access, setEmergencyAccess] = useState(false);
  return (
    <>
      <Modal
        centered
        opened={doctor_entry_opened}
        onClose={() => setDoctorEntryOpened(false)}
        title={<h1>Add a Doctor!</h1>}
      >
        {/* Modal content */}

        <Input
          //icon={<FaHospitalUser />}
          placeholder="Enter Doctor's Wallet ID"
          size="md"
        />
        <div className="mt-4 flex justify-end ">
          <Button className="text-white bg-baseColor" onClick={() => {}}>
            Save
          </Button>
        </div>
      </Modal>

      <div className="flex flex-col gap-4 items-center justify-center w-screen h-screen ">
        <div className="flex items-center justify-center gap-4">
          <Button
            className="text-white bg-baseColor"
            onClick={() => setDoctorEntryOpened(true)}
          >
            Add Doctor
          </Button>
          <Button
            className="text-white bg-red-600"
            onClick={() => setEmergencyAccess((p) => !p)}
          >
            Emergency Access
          </Button>
        </div>
        <div>
          {emergency_access && (
            <>
              <Input
                //icon={<FaHospitalUser />}
                placeholder="Enter Patient's unique ID"
                size="md"
              />
              <div className="mt-4 flex justify-end ">
                <Button className="text-white bg-baseColor" onClick={() => {}}>
                  View
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
