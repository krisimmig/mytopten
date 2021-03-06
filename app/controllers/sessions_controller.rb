class SessionsController < ApplicationController
  def new
  end

  def create
    if login(params[:name], params[:password])
      flash[:success] = "Welcome back #{params[:name]}!"
      redirect_back_or_to root_path
    else
      flash.now[:warning] = 'E-mail and/or password is incorrect.'
      render 'new'
    end
  end

  def destroy
    logout
    flash[:success] = 'See you!'
    redirect_to root_path
  end
end