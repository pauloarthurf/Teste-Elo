import * as Yup from "yup";

export async function validarCadastro(data: any) {
  const objetoASerValidado = Yup.object().shape({
    usuario: Yup.string()
      .required("Usuario Obrigatório"),

    password: Yup.string()
      .required("Senha obrigatória")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Deve conter 8 caracteres desses sendo, uma maiúscula, uma minúscula, um número e um caractere especial"
      ),
      passwordConfirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], "As senhas devem se iguais")
  });

  await objetoASerValidado.validate(
    {
      usuario: data.usuario,
      password: data.password,
      passwordConfirmation: data.passwordConfirmation,
    },
    {
      abortEarly: false,
    }
  );
}
