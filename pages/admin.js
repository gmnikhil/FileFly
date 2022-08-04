import { useEffect, useState } from "react";
import { Modal, Button } from "@mantine/core";
import { Input } from "@mantine/core";
import { AdminCard } from "../components/Card/AdminCard";
import CustomNavbar from "../components/Navbar/CustomNavbar";
import { useWalletDetails } from "../hooks/blockChain";
import { toast } from "react-toastify";

export default function Admin() {
  const [admin_entry_opened, setAdminEntryOpened] = useState(false);
  const [success_modal, setSuccessModalOpened] = useState(false);

  const { acc, FileFly, loading } = useWalletDetails();

  const [new_admin_id, setNewAdminId] = useState("");
  const [new_admin_name, setNewAdminName] = useState("");

  const [is_owner, setIsOwner] = useState(false);

  const [admins, setAdmins] = useState([]);

  const handleAdminAdd = async () => {
    //console.log(new_admin_id, new_admin_name);
    //const admin = await FileFly.methods.isAdmin(new_admin_id).call();
    //console.log(admin);
    //return;
    //console.log(typeof new_admin_id);
    //return;
    FileFly.methods
      .addAdmin(new_admin_id, new_admin_name)
      .send({ from: acc })
      .then((response) => {
        toast.success("Succesfully added!");
        setAdminEntryOpened(false);
        setNewAdminId("");
        setNewAdminName("");
        fetchAdmins();
      })
      .catch((e) => {
        console.log(e);
        toast.error("Could not add admin");
      });
  };

  const closeAdminAddModal = () => {
    setAdminEntryOpened(false);
    setNewAdminId("");
    setNewAdminName("");
  };

  const fetchAdmins = async () => {
    const adminCount = await FileFly.methods.adminCount().call();
    let adms = [];
    for (let i = 0; i < adminCount; i++) {
      adms.push(await FileFly.methods.admins(i).call());
    }
    setAdmins(adms);
  };

  const checkOwner = async () => {
    const owner = await FileFly.methods.isOwner(acc).call();
    setIsOwner(owner);
  };

  useEffect(() => {
    if (acc) {
      fetchAdmins();
      checkOwner();
    }
  }, [acc]);
  return (
    <>
      <Modal
        centered
        opened={admin_entry_opened}
        onClose={() => closeAdminAddModal()}
        title={<h1>Add an Admin!</h1>}
        closeOnClickOutside={false}
      >
        {/* Modal content */}
        <label className="text-sm">Wallet ID</label>
        <Input
          //icon={<FaHospitalUser />}
          placeholder="Enter new admin's wallet ID"
          size="md"
          className="mb-4"
          value={new_admin_id}
          onChange={(e) => setNewAdminId(e.target.value)}
        />
        <label className="text-sm">Name</label>
        <Input
          placeholder="Enter new admin's name"
          size="md"
          value={new_admin_name}
          onChange={(e) => setNewAdminName(e.target.value)}
        />
        <div className="mt-4 flex justify-end ">
          <Button
            className="text-white bg-baseColor"
            onClick={() => handleAdminAdd()}
            disabled={!new_admin_id || !new_admin_name}
          >
            Add Admin
          </Button>
        </div>
      </Modal>

      <Modal
        centered
        opened={success_modal}
        onClose={() => setSuccessModalOpened(false)}
        closeOnClickOutside={false}
        title={
          <h1 className="text-md text-center text-black text-xl">Success</h1>
        }
      >
        {/* Modal content */}

        <h1 className="text-md text-center text-black">
          Admin access revoked succesfully
        </h1>
        <div className="mt-4 flex justify-end ">
          <Button
            className="text-white bg-baseColor"
            onClick={() => setSuccessModalOpened(false)}
          >
            Close
          </Button>
        </div>
      </Modal>

      <div className="mb-14">
        <CustomNavbar
          admin={true}
          owner={true}
          adminAddModalOpened={admin_entry_opened}
          openAdminAddModal={() => setAdminEntryOpened(true)}
          addAdmin={!loading}
        />
        <div>
          <h2 className="mx-12 mb-8 flex justify-center text-3xl">Admins</h2>
        </div>
        <div className="grid grid-cols-3 gap-4 mx-10">
          {admins &&
            admins.map((adm, i) => {
              return (
                <AdminCard
                  key={i}
                  admin={adm}
                  handleRevoke={() => {
                    FileFly.methods
                      .removeAdmin(adm.index)
                      .send({ from: acc })
                      .then((response) => {
                        setSuccessModalOpened(true);
                        setAdmins((prev) => {
                          prev[i].access = false;
                          return prev;
                        });
                      })
                      .catch((e) => {
                        console.log(e);
                      });
                  }}
                />
              );
            })}
        </div>
        {!admins?.length && (
          <h1 className="flex justify-center text-lg italic">
            No admins found!
          </h1>
        )}
        <div></div>
      </div>
    </>
  );
}
