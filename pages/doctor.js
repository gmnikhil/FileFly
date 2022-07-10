import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { DragAndDrop } from "../components";
import { storeFile } from "../utils/storeFile";
import { Input, Textarea, Button } from "@mantine/core";
import { useWalletDetails } from "../hooks/blockChain";

export default function Doctor() {
  const [file, setFile] = useState();

  const [file_name, setFileName] = useState("");
  const [file_description, setFileDescription] = useState("");

  const { acc, healthNet, loading } = useWalletDetails();

  const [reports, setReports] = useState([]);

  const [user, setUser] = useState();
  const [index, setIndex] = useState(-1);

  const handleFile = (file) => {
    setFile(file);
  };

  const fetchReports = async () => {
    const reportCount = await healthNet.methods.reportCount().call();
    let reps = [];
    for (let i = 1; i <= reportCount; i++) {
      reps[i - 1] = await healthNet.methods.reports(i).call();
    }
    console.log(reps);
    setReports(reps);
  };

  const handleUpload = async () => {
    const res = await storeFile(file, file_name, file_description);
    let url = "";
    console.log(res);
    if (res.success) {
      url =
        `https://ipfs.io/` +
        res.data.data.image.href.replace(":", "").replace("//", "/");
    }
    console.log(user);
    console.log(url);
    const r = await healthNet.methods.editReport(user, url).send({ from: acc });
    console.log(r);
    setFile(null);
    setFileName("");
    setFileDescription("");
    setUser(null);
    setIndex(-1);
  };

  useEffect(() => {
    if (acc) {
      fetchReports();
    }
  }, [acc]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <h1 className="my-6">Hello Doctor</h1>
      <div
        style={{
          height: "auto",
          margin: "0 auto",
          maxWidth: 264,
          width: "100%",
        }}
      >
        <QRCode
          size={256}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={"http://www.mec.ac.in/"}
          viewBox={`0 0 256 256`}
        />
      </div>
      <div className="flex flex-col gap-5 my-10 mx-auto items-center">
        {reports &&
          reports.map((r, i) => {
            if (user && i !== index && i !== -1) return <></>;
            return (
              <div className="flex my-3 gap-2">
                <p>{r.link}</p>
                <Button
                  className="text-white bg-green-600"
                  onClick={() => {
                    if (user) {
                      setUser(null);
                      setIndex(-1);
                    } else {
                      setUser(r.user);
                      setIndex(i);
                    }
                    setFileName("");
                    setFileDescription("");
                    setFile(null);
                  }}
                >
                  {user ? "Cancel" : "Edit"}
                </Button>
              </div>
            );
          })}
      </div>
      {user && (
        <div className="w-6/12 mx-auto mt-8 mb-4">
          <h1 className="text-black text-lg font-semibold">
            Add Patient Record
          </h1>
          <Input
            //icon={<FaHospitalUser />}
            onChange={(e) => {
              setFileName(e.target.value);
            }}
            value={file_name}
            placeholder="Enter File Name"
            defaultValue={file_name}
            size="md"
          />
          <Textarea
            placeholder="Enter file description"
            className="mt-4"
            onChange={(e) => {
              setFileDescription(e.target.value);
            }}
            value={file_description}
            defaultValue={file_description}
          />
          <div className="w-full mx-auto my-5">
            {file ? (
              <div className="relative">
                <img
                  className="mx-auto"
                  src={URL.createObjectURL(file)}
                  style={{ maxHeight: "100px" }}
                />
                <Button
                  className="text-white bg-red-600 absolute right-0"
                  onClick={() => setFile(null)}
                >
                  Delete
                </Button>
              </div>
            ) : (
              <DragAndDrop handleFile={handleFile} />
            )}
          </div>
          <div className="mt-8 flex justify-center">
            <Button
              disabled={!file_name && !file_description && !file}
              className="text-white bg-baseColor"
              onClick={() => {
                handleUpload();
              }}
            >
              Save
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
