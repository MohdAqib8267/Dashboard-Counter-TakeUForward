import {
  Table,
  ToggleSwitch,
  Button,
  Checkbox,
  Label,
  Modal,
  TextInput,
} from "flowbite-react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import { useEffect, useState } from "react";
import axios from "axios";
import { Circles } from "react-loader-spinner";

function DataTable() {
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(true);
  const [data, setData] = useState({
    link: "",
    description: "",
    startTimer: dayjs(),
    endTimer: dayjs(),
    status: false,
  });
  const [update, setUpdate] = useState(false);
  const [id, setId] = useState("");
  const [events, setEvents] = useState([]);
  const URL =
    import.meta.env.MODE == "development"
      ? import.meta.env.VITE_LOCAL_URL
      : import.meta.env.VITE_BASE_URL;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData({
      ...data,
      [name]: type == "checkbox" ? checked : value,
    });
  };
  const handleDateChange = (newValue, name) => {
    // console.log('New Value:', newValue);
    // console.log(newValue,name);
    if (dayjs(newValue).isValid()) {
      setData({
        ...data,
        [name]: newValue,
      });
    } else {
      console.error("Invalid date:", newValue);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      if (update && id != "") {
        //update api
        const response = await axios.post(`${URL}/api/event/${id}`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        // console.log(response);
        setUpdate(false);
        setId("");
      } else {
        //create api
        const response = await axios.post(`${URL}/api/event`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      }

      setOpenModal(false);
      setData({});
      await fetchEvents();
    } catch (error) {
      if (error.response?.status == 409) {
        alert(`Event is already exist in this frame. please select another time frame except ${dayjs(error.response.data.overlappingEvent.startTimer)} to ${dayjs(error.response.data.overlappingEvent.endTimer)}`);
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${URL}/api/event`);
      if (response.data.success) {
        setEvents(response.data.data);
        setLoading(false);
      }
      console.log(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setOpenModal(false);
    fetchEvents();
  }, [events.length, setLoading]);

  function onCloseModal() {
    setOpenModal(false);
    setData({
      link: "",
      description: "",
      startTimer: dayjs(),
      endTimer: dayjs(),
      status: false,
    });
    setId("");
    setUpdate("");
  }
  const handleEdit = async (
    id,
    description,
    startTimer,
    endTimer,
    link,
    status
  ) => {
    try {
      setOpenModal(true);
      setUpdate(true);
      setId(id);
      setData({
        description: description,
        startTimer: dayjs(startTimer),
        endTimer: dayjs(endTimer),
        link: link,
        status: status,
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Circles color="#4fa94d" height={80} width={80} />
      </div>
    );
  }
  return (
    <div className="overflow-x-auto">
      <div className="flex flex-col md:flex-row mx-2 justify-between items-center">
        <p className="my-2">Most Recent Records</p>
        <button
          onClick={() => setOpenModal(true)}
          className="my-2 bg-green-500 text-white focus:outline-none"
        >
          Add New Event
        </button>
        {/* Modal */}
        <Modal
          show={openModal}
          className="mt-7"
          size="md"
          onClose={onCloseModal}
          popup
        >
          <Modal.Header />
          <Modal.Body>
            <div className="space-y-3">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Add New Event
              </h3>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="link" value="Your link" />
                </div>
                <TextInput
                  id="link"
                  placeholder="www.google.com"
                  name="link"
                  value={data.link}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <label
                    for="message"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your Description
                  </label>
                </div>
                <textarea
                  id="message"
                  rows="2"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write your thoughts here..."
                  name="description"
                  value={data.description}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer
                    components={[
                      "DateTimePicker",
                      "MobileDateTimePicker",
                      "DesktopDateTimePicker",
                      "StaticDateTimePicker",
                    ]}
                  >
                    <DemoItem label="Start Time">
                      <StaticDateTimePicker
                        name="startTimer"
                        value={data.startTimer}
                        onChange={(newValue) =>
                          handleDateChange(newValue, "startTimer")
                        }
                      />
                    </DemoItem>
                    <DemoItem label="End Time">
                      <StaticDateTimePicker
                        name="endTimer"
                        value={data.endTimer}
                        onChange={(newValue) =>
                          handleDateChange(newValue, "endTimer")
                        }
                      />
                    </DemoItem>
                  </DemoContainer>
                </LocalizationProvider>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="status"
                    type="checkbox"
                    checked={data.status}
                    name="status"
                    onChange={handleChange}
                  />
                  <Label htmlFor="status">Status</Label>
                </div>
              </div>
              <div className="w-full">
                <Button
                  onClick={handleSubmit}
                  className="w-full flex justify-center align-center"
                >
                  {update ? "Update" : "Submit"}
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
        {/* model end */}
      </div>

      <Table striped>
        <Table.Head>
          <Table.HeadCell>Description</Table.HeadCell>
          <Table.HeadCell>Expired</Table.HeadCell>
          <Table.HeadCell>Start Time</Table.HeadCell>
          <Table.HeadCell>End Time</Table.HeadCell>
          <Table.HeadCell>Link</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {events.length > 0 &&
            events.map((e) => (
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {e.description}
                </Table.Cell>
                <Table.Cell>
                  <ToggleSwitch
                    className="focus:outline-none border-none bg-transparent -mx-3"
                    checked={e.status}
                  />
                </Table.Cell>
                <Table.Cell>
                  {dayjs(e.startTimer).format("YYYY-MM-DD HH:mm:ss")}
                </Table.Cell>
                <Table.Cell>
                  {dayjs(e.endTimer).format("YYYY-MM-DD HH:mm:ss")}
                </Table.Cell>
                <Table.Cell>{e.link}</Table.Cell>
                <Table.Cell>
                  <a
                    href="#"
                    onClick={() =>
                      handleEdit(
                        e.id,
                        e.description,
                        e.startTimer,
                        e.endTimer,
                        e.link,
                        e.status
                      )
                    }
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Edit
                  </a>
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
    </div>
  );
}

export default DataTable;
