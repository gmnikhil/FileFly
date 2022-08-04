import { useEffect, useRef, useState } from "react";
import { useWalletDetails } from "../hooks/blockChain";
import CustomNavbar from "../components/Navbar/CustomNavbar";
import { FileCard } from "../components/Card/FileCard";
import AddFileModal from "../components/FileUpload/addFileModal";

export default function Dashboard() {
  const { acc, FileFly, loading } = useWalletDetails();

  const [files, setFiles] = useState([]);
  const [myFiles, setMyFiles] = useState([]);

  const [file_upload_modal_opened, setFileUploadModalOpened] = useState(false);

  const [isAdmin, setIsAdmin] = useState(false);

  const featuredRef = useRef();
  const myPostsRef = useRef();

  const closeFileUploadModal = () => {
    setFileUploadModalOpened(false);
  };

  const fetchFiles = async () => {
    const fileCount = await FileFly.methods.fileCount().call();
    let f = [];
    let m = [];
    for (let i = 0; i < fileCount; i++) {
      f[i] = await FileFly.methods.files(i).call();
      if (f[i].user === acc) m.push(f[i]);
    }
    setMyFiles(m);
    f = f.filter((p) => p.deleted !== true);
    setFiles(f);
  };

  const handleDeleted = (idx) => {
    fetchFiles();
  };

  const checkAdmin = async () => {
    const admin = await FileFly.methods.isAdmin(acc).call();
    const owner = await FileFly.methods.isOwner(acc).call();
    console.log(admin);
    console.log(owner);
    console.log(admin || owner);
    setIsAdmin(admin || owner);
  };

  useEffect(() => {
    if (acc) {
      fetchFiles();
      checkAdmin();
    }
  }, [acc]);

  const goTo = (sname) => {
    if (sname === "Featured") {
      featuredRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    } else if (sname === "My Posts") {
      myPostsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  };

  return (
    <>
      {file_upload_modal_opened && (
        <AddFileModal
          open={file_upload_modal_opened}
          handleClose={closeFileUploadModal}
          handleUpdate={fetchFiles}
        />
      )}
      <div className="mb-12">
        <CustomNavbar
          adminAddModalOpened={false}
          admin={isAdmin}
          fileUploadModalOpened={file_upload_modal_opened}
          openFileUploadModal={() => setFileUploadModalOpened(true)}
          openAdminAddModal={() =>
            //setAdminEntryOpened(true)
            {}
          }
          handleClick={goTo}
          addFile={!loading}
        />
        <section ref={featuredRef} className="pt-6">
          <div>
            <h2 className="mx-12 mb-8 flex justify-center text-3xl">
              Featured
            </h2>
          </div>
          <div className="grid grid-cols-3 gap-4 mx-10">
            {files &&
              files.map((file, i) => {
                return <FileCard key={i} file={file} />;
              })}
          </div>
          {!files?.length && (
            <h1 className="flex justify-center text-lg italic">
              No posts found!
            </h1>
          )}
        </section>
        <section ref={myPostsRef} className="pt-1">
          <div>
            <h2 className="mx-12 mt-14 mb-8 flex justify-center text-3xl">
              My Posts
            </h2>
          </div>
          <div className="grid grid-cols-3 gap-4 mx-10">
            {myFiles.map((f, i) => {
              return (
                <FileCard
                  key={i}
                  own={true}
                  file={f}
                  handleDeleted={handleDeleted}
                />
              );
            })}
          </div>
          {!myFiles?.length && (
            <h1 className="flex justify-center text-lg italic">
              You have not posted yet!
            </h1>
          )}
        </section>
      </div>
    </>
  );
}
