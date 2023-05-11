import "./App.css";
import { useEffect, useState } from "react";
import { supabase } from "../src/utils/supabaseClient.js";
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Highlight,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

function App() {
  const [ownerNameInput, setOwnerNameInput] = useState("");
  const [vehicleIDInput, setVehicleIDInput] = useState("");

  const [owner, setOwner] = useState();
  const [vehicle, setVehicle] = useState();
  const [registration, setRegistration] = useState();

  const [isOpenModalGetDetails, setIsOpenModalGetDetails] = useState(false);

  const handleOpenModalGetDetails = () => {
    setIsOpenModalGetDetails(true);
  };
  const handleCloseModalGetDetails = () => {
    setIsOpenModalGetDetails(false);
  };

  const fetchOwner = async () => {
    let { data: data, error } = await supabase
      .from("owner")
      .select("*")
      .eq("ownerid", ownerNameInput);

    if (error) console.log("error", error);
    else setOwner(data[0]);
  };

  const fetchVehicle = async () => {
    let { data: data, error } = await supabase
      .from("vehicle")
      .select("*")
      .eq("vehicleid", vehicleIDInput);

    if (error) console.log("error", error);
    else setVehicle(data[0]);
  };

  const fetchRegistration = async () => {
    let { data: data, error } = await supabase
      .from("registration")
      .select("*")
      .eq("ownerid", ownerNameInput)
      .eq("vehicleid", vehicleIDInput);

    if (error) console.log("error", error);
    else setRegistration(data[0]);
  };

  const handleSubmit = () => {
    handleOpenModalGetDetails();

    fetchOwner().catch(console.error);
    fetchVehicle().catch(console.error);
    fetchRegistration().catch(console.error);

    console.log(owner);
    console.log(vehicle);
    console.log(registration);

    // reset input fields
  };

  return (
    <>
      <Stack w={"100vw"} h={"100vh"}>
        <Center my={"3rem"}>
          <Heading color={"#22223b"}>
            <Highlight
              query={"Vehicle Registration Details"}
              styles={{ px: "2", py: "1", rounded: "full", bg: "orange.100" }}
            >
              Find Your Vehicle Registration Details Online
            </Highlight>
          </Heading>
        </Center>

        <Center>
          <Box
            w={300}
            p={"20px"}
            border={"1px solid black"}
            borderRadius={"10px"}
          >
            <FormControl isRequired>
              <Box mb={"10px"}>
                <FormLabel>Owner ID</FormLabel>
                <Input
                  type="text"
                  value={ownerNameInput}
                  onChange={(e) => setOwnerNameInput(e.target.value)}
                />
              </Box>

              <Box mb={"10px"}>
                <FormLabel>Vehicle ID</FormLabel>
                <Input
                  type="text"
                  value={vehicleIDInput}
                  onChange={(e) => setVehicleIDInput(e.target.value)}
                />
              </Box>

              <Button
                mt={"1.2rem"}
                w={"full"}
                variant="outline"
                onClick={handleSubmit}
              >
                Get Details
              </Button>
            </FormControl>
          </Box>
        </Center>
      </Stack>

      <Modal
        isOpen={isOpenModalGetDetails}
        onClose={handleCloseModalGetDetails}
        size={"full"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={"5rem"}>
            {owner && owner.ownername}
          </ModalHeader>
          <ModalBody fontSize={"1.4rem"}>
            {owner && vehicle &&
              (
                <Box>
                  <Text color={"gray.400"}>ID</Text>
                  {owner.ownerid}
                  <Divider my={"0.5rem"} />
                  <Text color={"gray.400"}>Address</Text>
                  {owner.address}

                  <Heading mt="2rem" mb="1rem">Vehicle Information</Heading>
                  <Text color={"gray.400"}>Vehicle ID</Text>
                  {vehicle.vehicleid}
                  <Divider my={"0.5rem"} />
                  <Text color={"gray.400"}>Brand Code</Text>
                  {vehicle.brandcode}
                  <Divider my={"0.5rem"} />
                  <Text color={"gray.400"}>Model Code</Text>
                  {vehicle.modelcode}
                  <Divider my={"0.5rem"} />
                  <Text color={"gray.400"}>Color</Text>
                  {vehicle.color}
                  <Divider my={"0.5rem"} />
                  <Text color={"gray.400"}>Engine Number</Text>
                  {vehicle.engineno}
                  <Divider my={"0.5rem"} />
                  <Text color={"gray.400"}>Class Number</Text>
                  {vehicle.classicno}

                  <Heading mt="2rem" mb="1rem">
                    Registration Information
                  </Heading>
                  <Text color={"gray.400"}>Exp Date</Text>
                  {registration.expdate}
                  <Divider my={"0.5rem"} />
                  <Text color={"gray.400"}>Registration Date</Text>
                  {registration.regdate}
                  <Divider my={"0.5rem"} />
                  <Text color={"gray.400"}>Registration Place</Text>
                  {registration.regplace}
                </Box>
              )}
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleCloseModalGetDetails}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default App;
