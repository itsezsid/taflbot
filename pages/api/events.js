const handler = (req, res) => {
      if (req.body.name === "app.install") {
            process.env.USER_TOKEN = req.body.token;
      }

      res.status(200).json({});
}

export default handler;