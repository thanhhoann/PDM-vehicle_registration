import "./App.css";
import { useEffect, useState } from "react";
import { supabase } from "../src/utils/supabaseClient.js";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
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
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import Header from "./components/Header";
import { motion } from "framer-motion";
import ChildrenInfo from "./components/ChildrenInfo";

function App() {
  const toast = useToast();

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
    // owner ID and vehicle ID is blank
    if (ownerNameInput.length == 0 && vehicleIDInput.length == 0) {
      toast({
        title: "Please enter your owner ID and vehicle ID",
        status: "error",
        duration: 3500,
        isClosable: true,
      });
      // owner ID is blank
    } else if (ownerNameInput.length == 0) {
      toast({
        title: "Please enter your owner ID",
        status: "error",
        duration: 3500,
        isClosable: true,
      });
      // vehicle ID is blank
    } else if (vehicleIDInput.length == 0) {
      toast({
        title: "Please enter your vehicle ID",
        status: "error",
        duration: 3500,
        isClosable: true,
      });
    } else {
      handleOpenModalGetDetails();

      fetchOwner().catch(console.error);
      fetchVehicle().catch(console.error);
      fetchRegistration().catch(console.error);

      console.log(owner);
      console.log(vehicle);
      console.log(registration);

      // reset input fields
      setOwnerNameInput("");
      setVehicleIDInput("");
    }
  };

  return (
    <>
      <Stack w={"100vw"} h={"100vh"}>
        <Header />

        <Center>
          <Box
            w={400}
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

        <Center
          position="fixed"
          bottom={0}
          width="100%"
          p={4}
          textAlign="center"
          fontWeight="700"
        >
          <Box
            bgColor="black"
            color="white"
            w="fit-content"
            px={3}
            py={1}
            rounded="1rem"
          >
            Made by&nbsp;
            <Link href="https://www.instagram.com/hoanthanh_/" isExternal>
              @hoanthanh_
            </Link>
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
            {owner && vehicle && registration
              ? (
                <Box>
                  <motion.div initial={{ x: -100 }} animate={{ x: 0 }}>
                    <Text color={"gray.400"}>ID</Text>
                    {owner.ownerid}
                  </motion.div>
                  <Divider my={"0.5rem"} />
                  <motion.div initial={{ x: -100 }} animate={{ x: 0 }}>
                    <Text color={"gray.400"}>Address</Text>
                    {owner.address}
                  </motion.div>

                  <Heading mt="2rem" mb="1rem">Vehicle Information</Heading>
                  <motion.div initial={{ x: -100 }} animate={{ x: 0 }}>
                    <Text color={"gray.400"}>Vehicle ID</Text>
                    {vehicle.vehicleid}
                  </motion.div>
                  <Divider my={"0.5rem"} />
                  <motion.div initial={{ x: -100 }} animate={{ x: 0 }}>
                    <Text color={"gray.400"}>Brand Code</Text>
                    {vehicle.brandcode}
                  </motion.div>
                  <Divider my={"0.5rem"} />
                  <motion.div initial={{ x: -100 }} animate={{ x: 0 }}>
                    <Text color={"gray.400"}>Model Code</Text>
                    {vehicle.modelcode}
                  </motion.div>
                  <Divider my={"0.5rem"} />
                  <motion.div initial={{ x: -100 }} animate={{ x: 0 }}>
                    <Text color={"gray.400"}>Color</Text>
                    {vehicle.color}
                  </motion.div>
                  <Divider my={"0.5rem"} />
                  <motion.div initial={{ x: -100 }} animate={{ x: 0 }}>
                    <Text color={"gray.400"}>Engine Number</Text>
                    {vehicle.engineno}
                  </motion.div>
                  <Divider my={"0.5rem"} />
                  <motion.div initial={{ x: -100 }} animate={{ x: 0 }}>
                    <Text color={"gray.400"}>Class Number</Text>
                    {vehicle.classicno}
                  </motion.div>

                  <Heading mt="2rem" mb="1rem">
                    Registration Information
                  </Heading>
                  <ChildrenInfo
                    title={"Expiration Date"}
                    content={registration.expdate}
                  />
                  <Divider my={"0.5rem"} />
                  <ChildrenInfo
                    title={"Registration Date"}
                    content={registration.regdate}
                  />
                  <Divider my={"0.5rem"} />
                  <ChildrenInfo
                    title={"Registration Place"}
                    content={registration.regplace}
                  />
                  <Divider my={"0.5rem"} />
                </Box>
              )
              : (
                <Center w="100vw" h="100vh">
                  <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="black.500"
                    size="xl"
                  />
                </Center>
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
