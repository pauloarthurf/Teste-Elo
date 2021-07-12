import { Button, Flex, Stack, Link, Image, Text } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { Input } from "../components/Form/Input";
import { FormHandles } from "@unform/core";
import { validarLogin } from "../validators/validarLogin";
import * as Yup from "yup";
import getValidationErrors from "../shared/getValidationErrors";

export default function Login() {
  const formRef = useRef<FormHandles>(null);

  const [mensagemErro, setMensagemErro] = useState<string[] | undefined>([]);

  async function submitFormulario(data: any) {
    const objetoLogin = {
      email: data.email,
      password: data.password,
    };

    try {
      formRef.current?.setErrors({});

      await validarLogin(objetoLogin);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        setMensagemErro(err.errors);
      }
    }
  }

  return (
    <Flex width="100vw" height="100vh" alignItems="center" justify="center">
      <Stack spacing={24} maxWidth={360}>
        <Image
          src="https://elogroup.com.br/wp-content/uploads/2020/09/logo-EloGroup-branco.png"
          alt="Logo da empresa Elogroup"
        />

        <Flex
          as="form"
          width="100%"
          maxWidth={360}
          bg="gray.800"
          padding={8}
          borderRadius={8}
          direction="column"
          onSubmit={submitFormulario}
        >
          <Stack spacing={4}>
            <Input name="email" label="E-mail"></Input>

            <Text marginTop={2} color="red">
              {mensagemErro?.find((error) => error === "E-mail Obrigatório") ||
                mensagemErro?.find(
                  (error) => error === "Este e-mail é invalido"
                )}
            </Text>
            <Input name="password" label="Senha"></Input>

            <Text marginTop={2} color="red">
              {mensagemErro?.find((error) => error === "Senha obrigatória") ||
                mensagemErro?.find(
                  (error) =>
                    error ===
                    "Deve conter 8 caracteres desses sendo, uma maiúscula, uma minúscula, um número e um caractere especial"
                )}
            </Text>
          </Stack>
          <Button
            type="submit"
            marginTop={6}
            colorScheme="red"
            size="lg"
            marginBottom="6"
          >
            Entrar
          </Button>

          <Link href="/singUp">Cadastrar</Link>
        </Flex>
      </Stack>
    </Flex>
  );
}
