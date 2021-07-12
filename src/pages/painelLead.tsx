import { Box, Button, Icon, Image, Link } from "@chakra-ui/react";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import data from "../data/data.json";
import Board from "react-trello";

export default function painelLead() {
  return (
    <>
      <Box maxWidth={360} marginBottom="16">
        <Image
          src="https://elogroup.com.br/wp-content/uploads/2020/09/logo-EloGroup-branco.png"
          alt="Logo da empresa Elogroup"
        />
      </Box>
      <Box paddingBottom="8">
        <Button
          as="a"
          size="lg"
          fontSize="lg"
          colorScheme="blue"
          leftIcon={<Icon as={RiAddLine} fontSize="20" />}
        >
          <Link href="/newLead">Novo Lead</Link>
        </Button>
      </Box>
      <div className="App">
        <Board data={data} draggable background />
      </div>
    </>
  );
}
