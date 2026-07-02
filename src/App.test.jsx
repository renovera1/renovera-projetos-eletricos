import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import App from "./App";

function renderAt(path = "/") {
  window.history.pushState({}, "", path);
  return render(<App />);
}

describe("Kairós Engenharia site", () => {
  beforeEach(() => {
    window.history.pushState({}, "", "/");
  });

  it("renderiza a página inicial", () => {
    renderAt();
    expect(
      screen.getByRole("heading", {
        name: /Engenharia de Alta Performance, Inteligência de Dados e Soluções Regulatórias/i,
      }),
    ).toBeInTheDocument();
  });

  it("abre e fecha o menu mobile", async () => {
    const user = userEvent.setup();
    renderAt();
    const button = screen.getByRole("button", { name: /abrir menu/i });
    await user.click(button);
    expect(screen.getByRole("button", { name: /fechar menu/i })).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: "Serviços" }).length).toBeGreaterThan(0);
  });

  it("navega para serviços", async () => {
    const user = userEvent.setup();
    renderAt();
    await user.click(screen.getByRole("button", { name: /Conhecer Serviços/i }));
    expect(screen.getByRole("heading", { name: /Serviços concebidos/i })).toBeInTheDocument();
  });

  it("valida o formulário de contato", async () => {
    const user = userEvent.setup();
    renderAt("/contato/");
    await user.click(screen.getByRole("button", { name: /Enviar solicitação/i }));
    expect(screen.getByText("Informe seu nome.")).toBeInTheDocument();
    expect(screen.getByText("É necessário autorizar o contato para enviar sua solicitação.")).toBeInTheDocument();
  });

  it("renderiza o rodapé institucional", () => {
    renderAt();
    expect(screen.getByText(/Todos os direitos reservados/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /LinkedIn/i })).toHaveAttribute("rel", "noopener noreferrer");
  });
});
