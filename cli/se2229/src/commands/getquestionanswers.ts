import { Command, Flags } from '@oclif/core';
import axios from 'axios';
import * as https from 'https';

axios.defaults.httpsAgent = new https.Agent();

export default class getquestionanswers extends Command {
  static description = 'returns an object that includes all the answers (for all sessions) in a specific question of a specific questionnaire';

  static flags = {
    // flag with a value (-n, --name=VALUE)
    format: Flags.string({
      options: ['json', 'csv'],
      required: true,
      default: 'json',
    }),
    questionnaire_id: Flags.string({
      required: true,
      description: 'choose the questionnaire whose answers will be returned'
    }),
    question_id: Flags.string({
      required: true,
      description: 'choose the question whose answer will be returned'
     }),
  };

  public async run(): Promise<void> {
    let data: any; // type annotation to specify the type of the variable

    try {
      const { flags } = await this.parse(getquestionanswers);
      if (flags.format === 'csv') {
        const response = await axios.get(`http://localhost:9103/intelliq_api/getquestionanswers/${flags.questionnaire_id}/${flags.question_id}?format=csv`);
        data = response.data;
      } else {
        const response = await axios.get(`http://localhost:9103/intelliq_api/getquestionanswers/${flags.questionnaire_id}/${flags.question_id}`);
        data = response.data;
      }
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }
}
