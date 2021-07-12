import { Button, Flex, Image, Stack, Text, Link } from "@chakra-ui/react";
import { FormHandles } from "@unform/core";
import React, { useState } from "react";
import { useRef } from "react";
import { Input } from "../components/Form/Input";
import getValidationErrors from "../shared/getValidationErrors";
import { validarCadastro } from "../validators/validaCadastro";
import * as Yup from "yup";

export default function Cadastro() {
  const formRef = useRef<FormHandles>(null);

  const [mensagemErro, setMensagemErro] = useState<string[] | undefined>([]);

  async function submitFormulario(data: any) {
    const objetoLogin = {
      email: data.email,
      password: data.password,
      passwordConfirmation: data.passwordConfirmation,
    };

    try {
      formRef.current?.setErrors({});

      await validarCadastro(objetoLogin);
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
      alignItems="center"
      justify="center"
      direction="column"
      onSubmit={submitFormulario}
    >
      <Stack spacing={24} maxWidth={360}>
        <Image
          src="https://elogroup.com.br/wp-content/uploads/2020/09/logo-EloGroup-branco.png"
          alt="Logo da empresa Elogroup"
        />

        <Flex
          as="form"
          width="100%"
          maxWidth={360}
          bg="#1d242d"
          padding={8}
          borderRadius={8}
          direction="column"
        >
          <Stack spacing={4}>
            <Input name="usuario" label="Usuario"></Input>
            <Text marginTop={2} color="red">
              {mensagemErro?.find((error) => error === "Usuario Obrigatório")}
            </Text>
            <Input name="password" label="Password"></Input>{" "}
            <Text marginTop={2} color="red">
              {mensagemErro?.find((error) => error === "Senha obrigatória") ||
                mensagemErro?.find(
                  (error) =>
                    error ===
                    "Deve conter 8 caracteres desses sendo, uma maiúscula, uma minúscula, um número e um caractere especial"
                )}
            </Text>
            <Input name="passwordConfirmation" label="Confimção Password"></Input>
            <Text marginTop={2} color="red">
              {mensagemErro?.find(
                (error) => error === "As senhas devem se iguais"
              )}
            </Text>
          </Stack>
          <Button type="submit" marginTop={6} colorScheme="red" size="lg">
          <Link href="/painelLead">Registrar</Link>
          </Button>
        </Flex>
      </Stack>
    </Flex>
  );
}
