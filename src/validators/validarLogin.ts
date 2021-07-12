import * as Yup from "yup";

export async function validarLogin(data: any) {
  const objetoASerValidado = Yup.object().shape({
    email: Yup.string()
      .required("E-mail Obrigatório")
      .email("Este e-mail é invalido"),

    password: Yup.string()
      .required("Senha obrigatória")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Deve conter 8 caracteres desses sendo, uma maiúscula, uma minúscula, um número e um caractere especial"
      ),
  });

  await objetoASerValidado.validate(
    {
      email: data.email,
      password: data.password,
    },
    {
      abortEarly: false,
    }
  );
}
