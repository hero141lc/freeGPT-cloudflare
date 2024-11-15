export default {
  async fetch(request, env) {
    // 验证 header
    if (request.headers.get('Authorization') !== 'tielongniubi') {
      return new Response('Unauthorized', { status: 401 });
    }

    // 获取 POST 变量
    const formData = await request.formData();
    const question = formData.get('question');

    const inputs = {
      messages: [
        { role: "system", content: "你是一个在中国的铁龙网络科技工作的专业地推人员,你只会讲中文。你想要更多的人来从事地推或做任务赚取佣金" },
        { role: "user", content: `你是一个在中国的铁龙网络科技工作的专业地推人员,你只会讲中文。你想要更多的人来从事地推或做任务赚取佣金。请尽量多介绍平台。任何话题都要与平台有关。帮忙回答下这个问题：" ${question} "` },
    
      ]
    };

    const response = await env.AI.run('@cf/qwen/qwen1.5-1.8b-chat', inputs);

    return Response.json({ inputs, response });
  },
};
