import { Center, Heading, Highlight } from "@chakra-ui/react";

export default function Header() {
  return (
    <>
      <Center my={"3rem"}>
        <Heading
          mx="auto"
          fontSize="1.8rem"
          color={"#22223b"}
          textAlign="center"
        >
          <Highlight
            query={"Vehicle Registration Details"}
            styles={{ px: "2", py: "1", rounded: "full", bg: "orange.100" }}
          >
            Find Your Vehicle Registration Details Online
          </Highlight>
        </Heading>
      </Center>
    </>
  );
}
