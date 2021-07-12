import {
  Box,
  Button,
  Checkbox,
  Flex,
  Image,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Tr,
  HStack,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Input } from "../components/Form/Input";
import "react-toastify/dist/ReactToastify.css";
import { FormHandles } from "@unform/core";
import * as Yup from "yup";
import getValidationErrors from "../shared/getValidationErrors";
import { validarLeads } from "../validators/validaLead";

export default function NewLead() {
  const [checkedItems, setCheckedItems] = useState([
    false,
    false,
    false,
    false,
  ]);

  const [clicouNoBotao, setClicouNoBotao] = useState(true);

  const allChecked = checkedItems.every(Boolean);
  const formRef = useRef<FormHandles>(null);

  const [mensagemErro, setMensagemErro] = useState<string[] | undefined>([]);

  async function submitFormulario(data: any) {
    const objetoLogin = {
      nome: data.nome,
      telefone: data.telefone,
      email: data.email,
    };

    try {
      formRef.current?.setErrors({});

      await validarLeads(objetoLogin);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        setMensagemErro(err.errors);
      }
    }
  }

  return (
    <Flex
      width="100vw"
      height="100vh"
      justify="center"
      direction="column"
      onSubmit={submitFormulario}
      marginLeft="200"
    >
      <Box maxWidth={360} marginBottom="16">
        <Image
          src="https://elogroup.com.br/wp-content/uploads/2020/09/logo-EloGroup-branco.png"
          alt="Logo da empresa Elogroup"
        />
      </Box>
      <HStack spacing={24}>
        <Box>
          <Flex
            as="form"
            width="100vh"
            maxWidth={360}
            bg="#1d242d"
            padding={8}
            borderRadius={8}
            direction="column"
          
          >
            <Stack spacing={4}>
              <Input name="nome" label="Nome"></Input>
              <Text marginTop={2} color="red">
                {mensagemErro?.find((error) => error === "Nome Obrigatório")}
              </Text>
              <Input name="telefone" label="Telefone"></Input>
              <Text marginTop={2} color="red">
                {mensagemErro?.find(
                  (error) => error === "Telefone Obrigatório"
                )}
              </Text>
              <Input name="email" label="Email"></Input>
              <Text marginTop={2} color="red">
                {mensagemErro?.find(
                  (error) => error === "E-mail Obrigatório"
                ) ||
                  mensagemErro?.find(
                    (error) => error === "Este e-mail é invalido"
                  )}
              </Text>
            </Stack>
          </Flex>
        </Box>

        <Flex marginLeft="24" direction="column" width="100%" flex="1" margin="auto" maxWidth={540}>
          <Stack spacing={4}>
            <Text>Novo Lead</Text>
            <Text>Oportunidades*</Text>
          </Stack>
          <Box>
            <Table variant="simple">
              <Tbody>
                <Tr>
                  <Td>
                    <Checkbox
                      isChecked={allChecked}
                      onChange={(e) =>
                        setCheckedItems([
                          e.target.checked,
                          e.target.checked,
                          e.target.checked,
                          e.target.checked,
                        ])
                      }
                    ></Checkbox>
                  </Td>
                  <Td></Td>
                </Tr>
                <Tr>
                  <Td>
                    <Checkbox
                      isChecked={checkedItems[0]}
                      onChange={(e) =>
                        setCheckedItems([
                          e.target.checked,
                          checkedItems[1],
                          checkedItems[2],
                          checkedItems[3],
                        ])
                      }
                    ></Checkbox>
                  </Td>
                  <Td>RPA</Td>
                </Tr>
                <Tr>
                  <Td>
                    <Checkbox
                      isChecked={checkedItems[1]}
                      onChange={(e) =>
                        setCheckedItems([
                          checkedItems[0],
                          e.target.checked,
                          checkedItems[2],
                          checkedItems[3],
                        ])
                      }
                    ></Checkbox>
                  </Td>
                  <Td>Produto Digital</Td>
                </Tr>
                <Tr>
                  <Td>
                    <Checkbox
                      isChecked={checkedItems[2]}
                      onChange={(e) =>
                        setCheckedItems([
                          checkedItems[0],
                          checkedItems[1],
                          e.target.checked,
                          checkedItems[3],
                        ])
                      }
                    ></Checkbox>
                  </Td>
                  <Td>Analytics</Td>
                </Tr>
                <Tr>
                  <Td>
                    <Checkbox
                      isChecked={checkedItems[3]}
                      onChange={(e) =>
                        setCheckedItems([
                          checkedItems[0],
                          checkedItems[1],
                          checkedItems[2],
                          e.target.checked,
                        ])
                      }
                    ></Checkbox>
                  </Td>
                  <Td>BPM</Td>
                </Tr>
              </Tbody>
            </Table>
          </Box>
          <Button
            type="submit"
            marginTop={6}
            colorScheme="blue"
            size="lg"
            onClick={() => {
              toast.success("Lead incluído com sucesso!");
            }}
          >
            Salvar
          </Button>

          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </Flex>
      </HStack>
    </Flex>
  );
}
