import * as Yup from "yup";

export async function validarLeads(data: any) {
  const objetoASerValidado = Yup.object().shape({
    nome: Yup.string()
      .required("Nome Obrigatório"),

      telefone: Yup.string()
      .required("Telefone Obrigatório"),
      
      email: Yup.string()
      .required("E-mail Obrigatório")
      .email("Este e-mail é invalido"),
  });

  await objetoASerValidado.validate(
    {
      nome: data.nome,
      telefone: data.telefone,
      email: data.email,
    },
    {
      abortEarly: false,
    }
  );
}
