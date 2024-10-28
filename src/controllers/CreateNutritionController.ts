import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateNutritionService } from '../Services/CreateNutritionServices';

export interface DataProps {
  name: string;
  weight: string;
  height: string;
  age: string;
  gender: string;
  objective: string;
  level: string;
}

class CreateNutritionController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    // Corrigido: wight para weight
    const { name, weight, height, age, gender, objective, level } = request.body as DataProps;

    // Cria uma nova instância do serviço de nutrição
    const createNutrition = new CreateNutritionService();

    try {
      // Chama o método execute() do serviço, aguardando a resposta
      const nutrition = await createNutrition.execute({
        name,
        weight,
        height,
        age,
        gender,
        objective,
        level,
      });

      // Envia a resposta de nutrição
      reply.send(nutrition);
    } catch (error) {
      // Tratamento de erro para capturar possíveis exceções
      console.error('Erro ao executar o serviço de nutrição:', error);
      reply.status(500).send({ error: 'Erro ao processar a solicitação' });
    }
  }
}

export { CreateNutritionController };
