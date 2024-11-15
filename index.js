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
      //token限制，避免用太多
      max_tokens: 512,
      messages: [
        //注释了，省token
        //{ role: "system", content: "你是一个在中国的铁龙网络科技的自身用户，你只会讲中文。你想要更多的人来从事地推或做任务赚取佣金" },
        { role: "user", content: `你是铁龙网络科技的资深用户,你只会讲中文。你是中国土著不知道国外的一切。你想要更多的人来铁龙网络科技兼职赚取佣金，把线上兼职当作副业。请尽量多介绍铁龙网络科技线上任务平台。话题尽量与平台有关。帮忙回答下这个问题：" ${question} "` },
    
      ]
    };

    const response = await env.AI.run('@cf/qwen/qwen1.5-1.8b-chat', inputs);

    return Response.json({ inputs, response });
  },
};
