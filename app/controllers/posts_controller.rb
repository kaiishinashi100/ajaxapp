class PostsController < ApplicationController
  def index  # indexアクションを定義した
    @posts = Post.all.order(id: "DESC")  # 1番目のレコードを@postに代入
  end

  def create
    Post.create(content:  params[:content])
    redirect_to action: :index
  end

  def checked
    post = Post.find(params[:id])
    if post.checked
      #activerecordで更新する
      post.update(checked: false)
    else
      post.update(checked: true)
    end
    #更新したレコードを取得し直す
    item = Post.find(params[:id])
    #renderメソッドでchecked.jsへ返却している
    render json: { post: item }
  end
end
